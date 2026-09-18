const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('--- Testing Catalog Data Integrity ---');

const productsPath = path.join(__dirname, '../src/data/products.json');
const configPath = path.join(__dirname, '../src/data/siteConfig.json');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Test 1: Count of products
assert.strictEqual(products.length, 28, 'Catalog must contain exactly 28 products');
console.log('✓ 28 Products verified');

// Test 2: Unique IDs
const ids = new Set(products.map(p => p.id));
assert.strictEqual(ids.size, 28, 'All product IDs must be unique');
console.log('✓ Unique IDs verified');

// Test 3: Essential fields on every product
products.forEach((p, idx) => {
  assert(p.title && p.title.length > 5, `Product #${idx} missing valid title`);
  assert(typeof p.price === 'number' && p.price > 0, `Product #${idx} missing valid price`);
  assert(p.category && p.category.length > 0, `Product #${idx} missing valid category`);
  assert(p.size && p.size.length > 0, `Product #${idx} missing valid size`);
  assert(p.material && p.material.length > 0, `Product #${idx} missing material`);
  assert(p.warranty, `Product #${idx} missing warranty`);
});
console.log('✓ All 28 items have required fields and valid prices');

// Test 4: Categories
const categories = [...new Set(products.map(p => p.category))];
console.log('Categories present:', categories);
assert(categories.includes('Sideboards & Consoles'), 'Missing Sideboards & Consoles');
assert(categories.includes('Display & Bar Cabinets'), 'Missing Display & Bar Cabinets');
assert(categories.includes('LED Dressing Tables'), 'Missing LED Dressing Tables');
assert(categories.includes('Fluted Wardrobes'), 'Missing Fluted Wardrobes');
assert(categories.includes('Pooja Mandirs'), 'Missing Pooja Mandirs');
console.log('✓ All 5 core categories verified');

// Test 5: Site Config
assert(config.brandName, 'Missing brandName in config');
assert(config.whatsappNumber, 'Missing whatsappNumber in config');
assert(config.location, 'Missing location in config');
console.log('✓ Site configuration verified');

console.log('ALL CATALOG TESTS PASSED!\n');
