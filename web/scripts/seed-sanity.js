import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.resolve(__dirname, '../src/data/products.json');
const outputPath = path.resolve(__dirname, '../../sanity-products.ndjson');

console.log('--- Generating Sanity NDJSON Seed File for Factory Finish Furniture ---');

const rawProducts = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const sanityDocuments = rawProducts.map((p, index) => {
  // Generate a URL-friendly slug
  const slug = p.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 90);

  return {
    _type: 'product',
    title: p.title,
    slug: {
      _type: 'slug',
      current: `${slug}-${index + 1}`,
    },
    category: p.category,
    size: p.size,
    isCustomizable: p.isCustomizable !== false,
    material: p.material,
    finish: p.finish,
    color: p.color,
    warranty: p.warranty,
    storage: p.storage || '',
    hardware: p.hardware || '',
    badge: p.badge || '',
    features: p.features || [],
    description: p.description || '',
    inStock: p.inStock !== false,
  };
});

// Write NDJSON format (one valid JSON object per line)
const ndjsonContent = sanityDocuments.map((doc) => JSON.stringify(doc)).join('\n') + '\n';
fs.writeFileSync(outputPath, ndjsonContent, 'utf8');

console.log(`✓ Successfully exported ${sanityDocuments.length} products to:`);
console.log(`  ${outputPath}\n`);

console.log('To import these 28 products directly into your Sanity dataset, run:');
console.log('  cd studio && npx sanity dataset import ../sanity-products.ndjson production\n');
