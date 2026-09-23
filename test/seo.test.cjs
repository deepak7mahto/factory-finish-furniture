const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- Testing SEO, Structured Data & Discoverability ---');

const rootDir = path.resolve(__dirname, '..');
const indexPath = path.join(rootDir, 'index.html');
const robotsPath = path.join(rootDir, 'public', 'robots.txt');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
const DOMAIN = 'https://factoryfinishfurniture.com/';

// === index.html ===
assert(fs.existsSync(indexPath), 'index.html must exist');
const html = fs.readFileSync(indexPath, 'utf-8');

// Canonical URL
assert(
  html.includes(`<link rel="canonical" href="${DOMAIN}" />`),
  `Canonical link must point to ${DOMAIN}`
);
console.log('✓ Canonical URL verified');

// Meta description (present and non-trivial)
const descMatch = html.match(/name="description"\s+content="([^"]+)"/);
assert(descMatch, 'Meta description must be present');
assert(descMatch[1].length >= 80 && descMatch[1].length <= 320,
  `Meta description length ${descMatch[1].length} must be 80-320 chars for optimal SERP display`);
console.log('✓ Meta description verified (length: ' + descMatch[1].length + ')');

// Meta keywords
assert(html.includes('name="keywords"'), 'Meta keywords must be present');
console.log('✓ Meta keywords verified');

// Robots directive
assert(html.includes('name="robots" content="index, follow'), 'Robots meta tag must allow indexing');
console.log('✓ Robots meta directive verified');

// Open Graph tags
const requiredOg = [
  ['property="og:type" content="website"', 'og:type'],
  [`property="og:url" content="${DOMAIN}"`, 'og:url'],
  ['property="og:title"', 'og:title'],
  ['property="og:description"', 'og:description'],
  ['property="og:image" content="https://', 'og:image (absolute URL)'],
  ['property="og:site_name" content="Factory Finish Furniture"', 'og:site_name'],
  ['property="og:locale" content="en_IN"', 'og:locale'],
];
requiredOg.forEach(([tag, label]) => {
  assert(html.includes(tag), `Missing Open Graph tag: ${label}`);
});
console.log('✓ Open Graph tags verified (' + requiredOg.length + ' tags)');

// Twitter Card
assert(html.includes('name="twitter:card" content="summary_large_image"'), 'Twitter card must be summary_large_image');
assert(html.includes('name="twitter:title"'), 'Twitter title must be present');
assert(html.includes('name="twitter:image" content="https://'), 'Twitter image must be absolute URL');
console.log('✓ Twitter Card tags verified');

// Geo targeting
assert(html.includes('name="geo.region" content="IN-DL"'), 'Geo region must be IN-DL');
assert(html.includes('name="geo.placename" content="Delhi"'), 'Geo placename must be Delhi');
console.log('✓ Local SEO geo targeting verified');

// Schema.org JSON-LD
const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
const jsonLdBlocks = [];
let match;
while ((match = jsonLdRegex.exec(html)) !== null) {
  jsonLdBlocks.push(match[1].trim());
}
assert(jsonLdBlocks.length >= 2, `Must have at least 2 JSON-LD blocks, found ${jsonLdBlocks.length}`);

const schemaTypes = [];
jsonLdBlocks.forEach((block, i) => {
  let parsed;
  try {
    parsed = JSON.parse(block);
  } catch (e) {
    assert.fail(`JSON-LD block #${i + 1} has invalid JSON syntax: ${e.message}`);
  }
  assert.strictEqual(parsed['@context'], 'https://schema.org',
    `JSON-LD block #${i + 1} @context must be https://schema.org`);
  assert(parsed['@type'], `JSON-LD block #${i + 1} must have @type`);
  schemaTypes.push(parsed['@type']);
});

assert(schemaTypes.includes('FurnitureStore'), 'Must have FurnitureStore schema');
assert(schemaTypes.includes('FAQPage'), 'Must have FAQPage schema');
console.log('✓ Schema.org JSON-LD verified: ' + schemaTypes.join(', '));

// === robots.txt ===
assert(fs.existsSync(robotsPath), 'public/robots.txt must exist');
const robots = fs.readFileSync(robotsPath, 'utf-8');
assert(robots.includes('User-agent: *'), 'robots.txt must have User-agent directive');
assert(robots.includes(`Sitemap: ${DOMAIN}sitemap.xml`), 'robots.txt must reference sitemap');
console.log('✓ robots.txt verified');

// === sitemap.xml ===
assert(fs.existsSync(sitemapPath), 'public/sitemap.xml must exist');
const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
assert(sitemap.includes(`<loc>${DOMAIN}</loc>`), 'sitemap.xml must contain apex URL');
assert(sitemap.includes('<changefreq>'), 'sitemap.xml must specify changefreq');
console.log('✓ sitemap.xml verified');

// === CNAME guard ===
const cnamePath = path.join(rootDir, 'public', 'CNAME');
assert(fs.existsSync(cnamePath), 'public/CNAME must exist (deploy guard)');
const cname = fs.readFileSync(cnamePath, 'utf-8').trim();
assert.strictEqual(cname, 'factoryfinishfurniture.com',
  `CNAME must contain factoryfinishfurniture.com, got: ${cname}`);
console.log('✓ CNAME deploy guard verified');

// === Blog Hub & Guides Verification ===
const blogPages = [
  { file: 'blog/index.html', path: 'blog/', type: 'CollectionPage' },
  { file: 'blog/fluted-sideboards-delhi/index.html', path: 'blog/fluted-sideboards-delhi/', type: 'Article' },
  { file: 'blog/pu-polish-guide/index.html', path: 'blog/pu-polish-guide/', type: 'Article' },
  { file: 'blog/modern-crockery-units/index.html', path: 'blog/modern-crockery-units/', type: 'Article' },
  { file: 'blog/wooden-pooja-mandir-designs/index.html', path: 'blog/wooden-pooja-mandir-designs/', type: 'Article' }
];

blogPages.forEach(({ file, path: urlPath, type }) => {
  const fullPath = path.join(rootDir, file);
  assert(fs.existsSync(fullPath), `${file} must exist`);
  const content = fs.readFileSync(fullPath, 'utf-8');

  // Canonical URL
  const expectedCanonical = `<link rel="canonical" href="${DOMAIN}${urlPath}" />`;
  assert(content.includes(expectedCanonical), `${file} missing canonical: ${expectedCanonical}`);

  // Open Graph
  assert(content.includes('property="og:title"'), `${file} missing og:title`);
  assert(content.includes('property="og:image" content="https://'), `${file} missing absolute og:image`);

  // WhatsApp CTA
  assert(content.includes('wa.me/918826236138'), `${file} missing WhatsApp direct link`);

  // Schema JSON-LD
  const schemas = [];
  let sMatch;
  const sRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  while ((sMatch = sRegex.exec(content)) !== null) {
    schemas.push(JSON.parse(sMatch[1].trim()));
  }
  assert(schemas.length >= 1, `${file} must have at least 1 Schema.org JSON-LD script`);
  const foundTypes = schemas.map(s => s['@type']);
  assert(foundTypes.includes(type), `${file} must have ${type} schema, found: ${foundTypes.join(', ')}`);

  // Sitemap presence
  assert(sitemap.includes(`<loc>${DOMAIN}${urlPath}</loc>`), `sitemap.xml must list ${DOMAIN}${urlPath}`);
});

console.log('✓ All 5 Blog pages & guides verified (Canonical, OG, WhatsApp CTA, Schema ' +
  blogPages.map(b => b.type).join('/') + ', and sitemap entries)');

console.log('\nALL SEO TESTS PASSED!\n');

