const assert = require('assert');

// Test data
const sampleFBText = `
Premium Modern Fluted Sideboard & Glass Showcase | Factory Rate
₹22,500
Details
Condition
New
Product Details 📏 Size: 5 × 3 Feet (Customizable upon request) 🪵 Material: Premium Quality MDF Board with Toughened Tinted Glass ✨ Finish: High-Quality PU Polish for a flawless, pristine look 🎨 Color: Elegant Crisp White with Rich Gold/Brass Accents 🎨 5 Years Paint/Color Fade Warranty 🚪 Design: Contemporary aesthetic featuring vertical fluted (ribbed) side panels.
`;

// Helper implementations for test
function parseMarketplaceText(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const title = lines[0] || 'Custom Furniture Piece';

  // Price
  const priceMatch = text.match(/₹\s*([\d,]+)/) || text.match(/Rs\.?\s*([\d,]+)/i);
  const price = priceMatch ? parseInt(priceMatch[1].replace(/,/g, ''), 10) : 0;

  // Size
  const sizeMatch = text.match(/Size:\s*([^🪵✨🎨🚪🗄️🔩🧽💪🏭🚚\n\r]+)/i) || text.match(/(\d+\s*[×xX]\s*\d+\s*(?:Feet|ft|Inches|inch)?)/i);
  const size = sizeMatch ? sizeMatch[1].trim() : 'Custom Size';

  // Material
  const matMatch = text.match(/Material:\s*([^📏✨🎨🚪🗄️🔩🧽💪🏭🚚\n\r]+)/i);
  const material = matMatch ? matMatch[1].trim() : 'Premium MDF with PU Polish';

  // Category
  let category = 'Sideboards & Consoles';
  if (/wardrobe|almirah/i.test(title)) category = 'Fluted Wardrobes';
  else if (/dressing table|vanity|dresser/i.test(title)) category = 'LED Dressing Tables';
  else if (/mandir|temple/i.test(title)) category = 'Pooja Mandirs';
  else if (/display|crockery|bar unit|showcase/i.test(title)) category = 'Display & Bar Cabinets';

  return {
    title,
    price,
    size,
    material,
    category
  };
}

function generateWhatsAppUrl(product, { phone = '919871408101', pincode = '', notes = '' } = {}) {
  let msg = `Hello Factory Finish Furniture,\n`;
  msg += `I am interested in:\n`;
  msg += `*${product.title}*\n`;
  msg += `• Factory Price: ₹${product.price ? product.price.toLocaleString('en-IN') : 'N/A'}\n`;
  msg += `• Size: ${product.size || 'Standard'}\n`;
  if (pincode) msg += `• Delivery to Pincode: ${pincode}\n`;
  if (notes) msg += `• Custom Request: ${notes}\n`;
  msg += `\nPlease share more photos, video, and delivery details.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

console.log('--- Testing Utilities ---');

// Test 1: Parser
const parsed = parseMarketplaceText(sampleFBText);
console.log('Parsed result:', parsed);
assert.strictEqual(parsed.price, 22500, 'Price should be 22500');
assert(parsed.size.includes('5 × 3 Feet'), 'Size should contain 5 × 3 Feet');
assert(parsed.material.includes('MDF Board'), 'Material should match MDF Board');
console.log('✓ parseMarketplaceText passed');

// Test 2: WhatsApp URL
const testProduct = { id: 'fff-001', title: 'Fluted Sideboard', price: 22500, size: '5 × 3 Feet' };
const waUrl = generateWhatsAppUrl(testProduct, { pincode: '110001' });
assert(waUrl.startsWith('https://wa.me/919871408101?text='), 'Must point to wa.me with phone number');
assert(waUrl.includes(encodeURIComponent('Fluted Sideboard')), 'Must include encoded title');
assert(waUrl.includes(encodeURIComponent('110001')), 'Must include encoded pincode');
console.log('✓ generateWhatsAppUrl passed');

console.log('ALL UTILITY TESTS PASSED!\n');
