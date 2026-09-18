import siteConfig from '../data/siteConfig.json';

/**
 * Generates an encoded WhatsApp URL for product inquiry
 */
export function generateWhatsAppUrl(product, options = {}) {
  const phone = options.phone || siteConfig.whatsappNumber;
  const pincode = options.pincode ? options.pincode.trim() : '';
  const notes = options.notes ? options.notes.trim() : '';
  const customDimensions = options.customDimensions ? options.customDimensions.trim() : '';
  const customColor = options.customColor ? options.customColor.trim() : '';

  let message = `Hello Factory Finish Furniture,\n\n`;
  message += `I'm inquiring from your online catalog about:\n`;
  message += `*${product.title}*\n`;
  message += `• Item ID: ${product.id}\n`;
  message += `• Factory Price: ₹${product.price ? product.price.toLocaleString('en-IN') : 'N/A'}\n`;
  message += `• Standard Size: ${product.size || 'Standard'}\n`;

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
    message += `• Message/Notes: ${notes}\n`;
  }

  message += `\nPlease share live photos, video walkaround, and delivery timeline.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a general WhatsApp inquiry link (e.g. for custom order / questions)
 */
export function generateGeneralWhatsAppUrl(subject = 'Custom Furniture Inquiry') {
  const phone = siteConfig.whatsappNumber;
  const message = `Hello Factory Finish Furniture,\n\nI would like to discuss a ${subject}. Please let me know how we can proceed with design and custom quotation.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
