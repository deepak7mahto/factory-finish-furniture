import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

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

    // Normalize image URLs
    return docs.map((doc) => {
      const coverUrl = doc.image ? urlFor(doc.image).width(960).height(720).url() : null;
      const galleryUrls = doc.images && doc.images.length > 0
        ? doc.images.map((img) => urlFor(img).width(1200).url())
        : (coverUrl ? [coverUrl] : []);

      return {
        ...doc,
        id: doc.id || doc._id,
        image: coverUrl,
        images: galleryUrls,
        price: doc.price || 0, // quotes on request
        features: doc.features || [],
      };
    });
  } catch (error) {
    console.warn('[Sanity] Could not fetch products, falling back to local catalog:', error.message);
    return null;
  }
}
