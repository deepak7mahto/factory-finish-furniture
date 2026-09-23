# 05. Data Pipelines, Media Assets & Synchronization

This document explains how media assets are structured, how automated pipelines synchronize local files with Sanity's Content Lake, and how the frontend guarantees 100% asset resilience.

---

## 1. Media Asset Architecture

The project maintains two layers of media storage:

1. **Local Static Assets (`web/public/images/products/`):**
   * Stores 69 authentic workshop photographs categorized by product ID folders (e.g. `images/products/1253647393569405/photo_1.jpg`).
   * Bundled directly into the GitHub Pages deployment to serve as an instant, zero-latency local fallback.
2. **Cloud CDN Assets (Sanity Asset Pipeline):**
   * High-resolution images uploaded directly into Sanity's global image CDN.
   * Enables automatic WebP/AVIF format negotiation, responsive width resizing, and focal hotspot cropping without modifying source image files.

---

## 2. Automated Asset Upload Pipeline

To populate Sanity with all 69 authentic images and attach them to the 28 products, we developed an automated batch script:

* **Script Location:** `scripts/upload-all-images-to-sanity.cjs`
* **Execution:** `node scripts/upload-all-images-to-sanity.cjs`

### How the Pipeline Operates:
1. **Catalog Parsing:** Reads `web/src/data/products.json` (28 products).
2. **Document Matching:** Fetches existing Sanity documents via GROQ and matches them by slug or normalized title.
3. **Asset Deduplication:** Maintains an in-memory `assetCache` mapping file paths to Sanity asset IDs, ensuring no image is uploaded twice.
4. **Stream Upload:** Streams binary JPEG files to Sanity's asset endpoint (`client.assets.upload('image', fs.createReadStream(path))`).
5. **Atomic Document Patch:** Constructs image reference arrays with alt text and patches the Sanity document:
   ```javascript
   await client.patch(sanityDoc._id)
     .set({
       images: imageRefs,
       badge: item.badge,
     })
     .commit();
   ```

---

## 3. Resilient Storefront Client (`web/src/utils/sanity.js`)

A critical requirement is that **the live website must NEVER display blank or broken cards**, regardless of CMS connection state or pending editor uploads.

### GROQ Query Architecture:
```javascript
export async function fetchSanityProducts() {
  const query = `*[_type == "product" && (!defined(inStock) || inStock == true)] | order(_createdAt desc) {
    _id,
    title,
    "id": _id,
    "slug": slug.current,
    category,
    size,
    isCustomizable,
    material,
    finish,
    color,
    warranty,
    storage,
    hardware,
    badge,
    features,
    description,
    inStock,
    "image": images[0],
    "images": images
  }`;

  try {
    const docs = await sanityClient.fetch(query);
    if (!docs || docs.length === 0) return null;

    return docs.map((doc) => {
      // Find matching local item in case images are missing in Sanity
      const matchingLocal = localProducts.find(
        (lp) =>
          lp.slug === doc.slug ||
          lp.title?.trim().toLowerCase() === doc.title?.trim().toLowerCase()
      );

      const coverUrl = doc.image ? urlFor(doc.image).width(960).height(720).url() : null;
      const galleryUrls =
        doc.images && doc.images.length > 0
          ? doc.images.map((img) => urlFor(img).width(1200).url())
          : coverUrl ? [coverUrl] : [];

      // Seamless fallback to authentic local photography
      const finalImage = coverUrl || (matchingLocal ? matchingLocal.image : null);
      const finalImages =
        galleryUrls.length > 0
          ? galleryUrls
          : matchingLocal?.images?.length > 0
            ? matchingLocal.images
            : finalImage ? [finalImage] : [];

      return {
        ...doc,
        id: doc.id || doc._id,
        image: finalImage,
        images: finalImages,
        price: doc.price || 0, // quotes on request
        features: doc.features || (matchingLocal ? matchingLocal.features : []),
      };
    });
  } catch (error) {
    console.warn('[Sanity] Could not fetch products, falling back to local catalog:', error.message);
    return null;
  }
}
```

### Fallback Matrix:
| Scenario | Behavior | User Experience |
| :--- | :--- | :--- |
| **Sanity Online + Images Uploaded** | Serves dynamic CDN URLs via Sanity (`cdn.sanity.io`) | Fast WebP/AVIF images with custom hotspot cropping |
| **Sanity Online + Newly Created Item (No Image)**| Matches local item or shows clean architectural blueprint | Clean layout, no broken image icons |
| **Sanity Offline / Network Error** | `App.jsx` falls back to bundled `products.json` | 100% store uptime with all 28 authentic products and local photos |

---

## 4. Dataset Import & Export Commands

To backup or restore the content dataset:

```bash
# Export the entire production dataset (including assets and drafts)
cd studio
npx sanity dataset export production backup-production-$(date +%F).tar.gz

# Import products from seed NDJSON file
npx sanity dataset import ../sanity-products.ndjson production --replace
```
