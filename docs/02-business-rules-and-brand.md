# 02. Business Rules & Brand Identity

This document defines the core commercial logic, conversion architecture, and brand values of Factory Finish Furniture.

---

## 1. Brand Background & Value Proposition

* **Brand Name:** Factory Finish Furniture
* **Tagline:** *Architectural Luxury • Handcrafted in Delhi*
* **Workshop Owner & Lead Craftsman:** Manish Prasad
* **Location:** Delhi NCR Furniture Hub (Mangolpuri / Kirti Nagar industrial clusters)
* **Direct Workshop Contact:** `+91 88262 36138`
* **Commercial Model:** Direct-to-Consumer (D2C) Factory Workshop. By eliminating intermediate high-street showroom rents, commission agents, and distributor markups, homeowners save **40% to 50%** on luxury designer furniture.

---

## 2. The Price-Hidden Architecture (Core Rule)

### The Business Rationale
A foundational rule of this platform is: **Zero numeric retail prices are displayed anywhere on the public storefront.**

Instead of fixed prices, every product card and detail modal displays:
* **"Factory Rate on Request"**
* **"Delhi Manufacturer Rate • Custom Sizing"**
* Direct CTA button: **"Get Price"** or **"WhatsApp Inquiry"**

### Why This Rule Is Strictly Enforced:
1. **Bespoke Customization:** Almost 100% of luxury buyers request modifications (e.g. changing 5 ft width to 6.5 ft to fit a specific alcove, selecting Emerald Green vs Pearl White PU polish, or choosing fluted glass instead of tinted glass). A rigid numeric price misleads the buyer.
2. **Material Customization:** Clients can choose between Action TESA HDMR (High-Density Moisture-Resistant) board, Commercial Plywood, or Solid Wood internal framing.
3. **Logistics & Floor Delivery:** In India, shipping large architectural pieces (e.g. 6.5 ft crockery units or 3-door wardrobes) involves variables such as freight distance, crate packaging, floor lifting, or elevator dimensions.
4. **Lead Generation & Relationship Building:** Requiring inquiries via WhatsApp initiates a direct conversation between the homeowner/interior designer and Manish Prasad, where sketches, 3D renders, and finish samples can be exchanged.

---

## 3. The WhatsApp Inquiry Engine

When a buyer clicks **"Get Price"** on any product card or **"Request Custom Quote"** in the detail modal, the system generates a tailored, pre-populated WhatsApp message:

### WhatsApp URL Scheme:
```javascript
export function generateWhatsAppUrl(product, customNotes = '') {
  const phone = '918826236138';
  let message = `Hello Factory Finish Furniture, I am interested in getting a factory-direct quote for:
*${product.title}*
- Category: ${product.category}
- Default Size: ${product.size || 'Customizable'}
- Material: ${product.material || 'Premium MDF / HDMR'}
- Finish: ${product.finish || 'A-Grade PU Polish'}
- Custom Size Available: ${product.isCustomizable ? 'Yes' : 'Standard'}`;

  if (customNotes) {
    message += `\n- My Custom Requirements: ${customNotes}`;
  }

  message += `\n\nPlease share the direct factory price, delivery timeline for my location, and finish options. Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
```

### Conversion Flow:
1. Customer views high-resolution workshop photos on desktop or mobile.
2. Customer clicks **"Get Price"**.
3. WhatsApp or WhatsApp Web opens instantly with the structured product details already filled out.
4. The customer simply hits "Send".
5. Manish Prasad's workshop team immediately knows the exact design, standard size, and customer intent, allowing for prompt quoting within minutes.

---

## 4. Automated Integrity Tests

To prevent accidental price leaks by future developers or CMS editors, an automated test suite (`web/test/utils.test.cjs`) runs on every build:

* **Checks:**
  * Asserts that `generateWhatsAppUrl()` contains product title, size, and category.
  * Asserts that `generateWhatsAppUrl()` contains **ZERO hardcoded numeric rupee prices**.
  * Validates that all catalog listings pass the price-hidden verification check before any deployment can proceed.
