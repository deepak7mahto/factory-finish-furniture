import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';
import localProducts from '../data/products.json';

export const sanityClient = createClient({
  projectId: 'th649m10',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Use fast edge cache for production
});

const imageBuilder = createImageUrlBuilder(sanityClient);

/**
 * Generate an optimized Sanity CDN image URL with auto format & quality
 */
export function urlFor(source) {
  if (!source) return null;
  return imageBuilder.image(source).auto('format').fit('max');
}

/**
 * Fetch all published products from Sanity.
 * Maps Sanity document fields to our app's component model.
 */
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

    // Normalize image URLs with reliable fallback to local images
    return docs.map((doc) => {
      const matchingLocal = localProducts.find(
        (lp) =>
          lp.slug === doc.slug ||
          lp.title?.trim().toLowerCase() === doc.title?.trim().toLowerCase()
      );

      const coverUrl = doc.image ? urlFor(doc.image).width(960).height(720).url() : null;
      const galleryUrls =
        doc.images && doc.images.length > 0
          ? doc.images.map((img) => urlFor(img).width(1200).url())
          : coverUrl
            ? [coverUrl]
            : [];

      // If Sanity document doesn't have an image asset attached yet, fall back to authentic local image
      const finalImage = coverUrl || (matchingLocal ? matchingLocal.image : null);
      const finalImages =
        galleryUrls.length > 0
          ? galleryUrls
          : matchingLocal && matchingLocal.images && matchingLocal.images.length > 0
            ? matchingLocal.images
            : finalImage
              ? [finalImage]
              : [];

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
