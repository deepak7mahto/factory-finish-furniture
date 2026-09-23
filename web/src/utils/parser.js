/**
 * Heuristic parser for Facebook Marketplace listing text
 */
export function parseMarketplaceText(rawText) {
  if (!rawText || !rawText.trim()) {
    return null;
  }

  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  
  // 1. Extract Title
  let title = lines[0] || 'Custom Factory Furniture Piece';
  title = title.replace(/\s*\|\s*Factory\s*Rate/i, '').trim();

  // 2. Extract Price
  const priceMatch = rawText.match(/₹\s*([\d,]+)/) || rawText.match(/Rs\.?\s*([\d,]+)/i);
  const price = priceMatch ? parseInt(priceMatch[1].replace(/,/g, ''), 10) : 0;
  const originalPrice = price ? Math.round(price * 1.95) : 0;

  // 3. Extract Size / Dimensions
  const sizeMatch = 
    rawText.match(/Size:\s*([^🪵✨🎨🚪🗄️🔩🧽💪🏭🚚\n\r]+)/i) || 
    rawText.match(/(\d+(?:\.\d+)?\s*[×xX*]\s*\d+(?:\.\d+)?\s*(?:Feet|ft|Inches|inch|cm)?)/i);
  const size = sizeMatch ? sizeMatch[1].trim() : 'Standard (Customizable)';

  // 4. Extract Material
  const materialMatch = rawText.match(/Material:\s*([^📏✨🎨🚪🗄️🔩🧽💪🏭🚚\n\r]+)/i);
  const material = materialMatch ? materialMatch[1].trim() : 'Action TESA HDMR / MDF Board';

  // 5. Extract Finish
  const finishMatch = rawText.match(/Finish:\s*([^📏🪵🎨🚪🗄️🔩🧽💪🏭🚚\n\r]+)/i);
  const finish = finishMatch ? finishMatch[1].trim() : 'High-Quality PU Polish for a flawless finish';

  // 6. Extract Color
  const colorMatch = rawText.match(/Color:\s*([^📏🪵✨🚪🗄️🔩🧽💪🏭🚚\n\r]+)/i);
  const color = colorMatch ? colorMatch[1].trim() : 'Custom Color Available';

  // 7. Extract Warranty
  const warrantyMatch = rawText.match(/(\d+\s*Years?\s*[^.\n\r]+Warranty)/i);
  const warranty = warrantyMatch ? warrantyMatch[1].trim() : '5 Years Paint/Color Fade Warranty';

  // 8. Extract Storage
  const storageMatch = rawText.match(/Storage:\s*([^📏🪵✨🎨🔩🧽💪🏭🚚\n\r]+)/i);
  const storage = storageMatch ? storageMatch[1].trim() : 'Spacious internal shelving and cabinets';

  // 9. Extract Hardware
  const hardwareMatch = rawText.match(/Hardware:\s*([^📏🪵✨🎨🗄️🧽💪🏭🚚\n\r]+)/i);
  const hardware = hardwareMatch ? hardwareMatch[1].trim() : 'Premium sleek golden handles & heavy-duty hinges';

  // 10. Detect Category
  let category = 'Sideboards & Consoles';
  const lowerText = (title + ' ' + rawText).toLowerCase();
  if (/wardrobe|almirah|cupboard/i.test(lowerText)) {
    category = 'Fluted Wardrobes';
  } else if (/dressing table|dresser|vanity/i.test(lowerText)) {
    category = 'LED Dressing Tables';
  } else if (/mandir|temple|puja|pooja/i.test(lowerText)) {
    category = 'Pooja Mandirs';
  } else if (/bar unit|bar cabinet|crockery|showcase|display cabinet/i.test(lowerText)) {
    category = 'Display & Bar Cabinets';
  } else if (/storage cabinet|rack/i.test(lowerText)) {
    category = 'Storage Cabinets';
  }

  // Generate ID
  const id = `fff-${String(Math.floor(Math.random() * 900) + 100)}`;

  return {
    id,
    title,
    category,
    price,
    originalPrice,
    size,
    isCustomizable: true,
    material,
    finish,
    color,
    warranty,
    storage,
    hardware,
    features: [
      'Vertical fluted (ribbed) detailing',
      'High-quality PU polish with 5-year fade warranty',
      'Factory price rate direct from Delhi manufacturer',
      'Delivery all over India'
    ],
    image: '',
    badge: 'New Arrival',
    inStock: true
  };
}
