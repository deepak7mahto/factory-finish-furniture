import siteConfig from '../data/siteConfig.json';

/**
 * Generates an encoded WhatsApp URL for product inquiry without displaying hardcoded prices
 */
export function generateWhatsAppUrl(product, options = {}) {
  const phone = options.phone || siteConfig.whatsappNumber;
  const pincode = options.pincode ? options.pincode.trim() : '';
  const notes = options.notes ? options.notes.trim() : '';
  const customDimensions = options.customDimensions ? options.customDimensions.trim() : '';
  const customColor = options.customColor ? options.customColor.trim() : '';

  let message = `Hello Factory Finish Furniture,\n\n`;
  message += `I would like to get the direct factory rate and availability for:\n`;
  message += `*${product.title}*\n`;
  message += `• Item ID: ${product.id}\n`;
  message += `• Standard Dimensions: ${product.size || 'Standard'}\n`;

  if (customDimensions) {
    message += `• Requested Custom Size: ${customDimensions}\n`;
  }
  if (customColor) {
    message += `• Requested Color/Polish: ${customColor}\n`;
  }
  if (pincode) {
    message += `• Delivery Pincode: ${pincode}\n`;
  }
  if (notes) {
    message += `• Custom Requirements: ${notes}\n`;
  }

  message += `\nPlease share the factory price quote, photos, video walkaround, and delivery timeline.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a general WhatsApp inquiry link (e.g. for custom order / questions)
 */
export function generateGeneralWhatsAppUrl(subject = 'Factory Rate & Custom Design Inquiry') {
  const phone = siteConfig.whatsappNumber;
  const message = `Hello Factory Finish Furniture,\n\nI would like to discuss a ${subject}. Please share catalog details and factory pricing for my requirements.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
