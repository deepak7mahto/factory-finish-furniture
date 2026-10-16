const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Load local environment files if present
function loadEnv() {
  if (process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN) return;
  const candidatePaths = [
    path.join(__dirname, '../.env'),
    path.join(__dirname, '../.env.local'),
    path.join(process.cwd(), '.env'),
    path.join(process.cwd(), '.env.local'),
  ];
  for (const envPath of candidatePaths) {
    if (fs.existsSync(envPath)) {
      try {
        const lines = fs.readFileSync(envPath, 'utf8').split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const match = trimmed.match(/^([A-Za-z0-9_]+)=(.*)$/);
          if (match) {
            const key = match[1];
            let val = match[2].trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      } catch (e) {
        // Ignore read errors
      }
    }
  }
}

loadEnv();

const authToken = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN;

const client = createClient({
  projectId: 'th649m10',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: authToken,
  useCdn: false,
});

async function main() {
  if (!authToken) {
    console.error('❌ Error: SANITY_AUTH_TOKEN is required to upload assets to Sanity.');
    console.error('Please set SANITY_AUTH_TOKEN in your .env file or environment before running this script.');
    process.exit(1);
  }

  console.log('🚀 Starting image upload to Sanity Content Lake...');

  const productsPath = path.join(__dirname, '../web/src/data/products.json');
  const localProducts = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  console.log(`📦 Loaded ${localProducts.length} local products.`);

  const sanityDocs = await client.fetch('*[_type == "product"]{ _id, title, slug, badge }');
  console.log(`☁️ Found ${sanityDocs.length} product documents in Sanity.`);

  const assetCache = new Map(); // relPath -> assetId

  let successCount = 0;

  for (let i = 0; i < localProducts.length; i++) {
    const item = localProducts[i];
    const itemSlug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Find corresponding document in Sanity
    const sanityDoc = sanityDocs.find(
      (doc) =>
        (doc.slug && doc.slug.current === itemSlug) ||
        (doc.title && doc.title.trim().toLowerCase() === item.title.trim().toLowerCase())
    );

    if (!sanityDoc) {
      console.warn(`⚠️ [${i + 1}/${localProducts.length}] Could not find Sanity doc for "${item.title}"`);
      continue;
    }

    const imagesToUpload = item.images && item.images.length > 0 ? item.images : [item.image];
    const imageRefs = [];

    for (let imgIdx = 0; imgIdx < imagesToUpload.length; imgIdx++) {
      const relPath = imagesToUpload[imgIdx];
      const fullPath = path.join(__dirname, '../web/public', relPath);

      if (!fs.existsSync(fullPath)) {
        console.warn(`  ❌ File not found: ${fullPath}`);
        continue;
      }

      let assetId = assetCache.get(relPath);
      if (!assetId) {
        process.stdout.write(`  ⬆️ Uploading ${path.basename(relPath)}... `);
        const asset = await client.assets.upload('image', fs.createReadStream(fullPath), {
          filename: path.basename(relPath),
          contentType: 'image/jpeg',
        });
        assetId = asset._id;
        assetCache.set(relPath, assetId);
        process.stdout.write(`done (${assetId})\n`);
      } else {
        console.log(`  ⚡ Reusing cached asset: ${assetId}`);
      }

      imageRefs.push({
        _type: 'image',
        _key: `img_${imgIdx}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        asset: {
          _type: 'reference',
          _ref: assetId,
        },
        alt: `${item.title} - Authentic Delhi Workshop Photo ${imgIdx + 1}`,
      });
    }

    // Patch document
    await client
      .patch(sanityDoc._id)
      .set({
        images: imageRefs,
        badge: item.badge,
      })
      .commit();

    successCount++;
    console.log(`✅ [${i + 1}/${localProducts.length}] Updated "${item.title}" with ${imageRefs.length} images & badge "${item.badge}"`);
  }

  console.log(`\n🎉 Completed! Successfully updated ${successCount} products in Sanity.`);
}

main().catch((err) => {
  console.error('Fatal error uploading images:', err);
  process.exit(1);
});
