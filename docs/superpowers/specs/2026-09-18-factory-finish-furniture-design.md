# Design Specification: Factory Finish Furniture

**Date:** 2026-09-18  
**Topic:** Factory Finish Furniture — Static D2C Showcase Catalog & WhatsApp Lead Engine  
**Target Platform:** GitHub Pages (Static Web App)  
**Location:** Delhi, DL, India  
**Status:** Approved for Implementation  

---

## 1. Executive Summary & Goals

**Factory Finish Furniture** is a direct-from-manufacturer furniture business based in Delhi, India, specializing in contemporary, luxury-styled architectural furniture (fluted panels, PU polish, tinted glass, 3D textured fretwork, gold/brass metallic accents, and LED touch-mirrors).

The primary objective is to build a high-converting, mobile-first, static digital catalog that:
1. **Establishes Brand Credibility**: Presents products in an upscale, designer-grade presentation that highlights factory-direct prices (saving customers 40–50% vs. retail showrooms) alongside strong assurances (5-year color fade warranty, pan-India delivery).
2. **Drives High-Intent Leads directly to WhatsApp**: Every product card and modal features one-click WhatsApp pre-filled messages specifying product ID, title, size, and price.
3. **Pre-Seeds Existing Catalog**: Comes pre-populated with 28 active listings from Facebook Marketplace across 5 core categories.
4. **Simplifies Future Additions**: Includes a client-side "Paste & Auto-Parse" listing importer tool where new Facebook Marketplace listings can be pasted and immediately converted into structured JSON entries.
5. **Zero-Maintenance Hosting**: Runs as a 100% static application hosted on GitHub Pages with instant manual deployment via `npm run deploy`.

---

## 2. Technical Stack & Architecture

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (customized with luxury warm ivory, charcoal, and brushed gold palette)
- **Icons**: Lucide React
- **Data Source**: Static JSON files (`src/data/products.json` and `src/data/siteConfig.json`)
- **Routing**: Lightweight client-side single-page architecture with modal views and an Admin drawer/view (zero 404 routing issues on GitHub Pages)
- **Deployment**: GitHub Pages with relative asset pathing (`base: './'`) and manual deploy script (`gh-pages`)

```
factory-finish-furniture/
├── public/
│   └── images/
│       └── products/           # Local product photos stored directly in repo
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Brand header, category navigation, WhatsApp callout
│   │   ├── Hero.jsx            # Value proposition, trust badges (Factory Direct, 5-Yr Warranty)
│   │   ├── ProductGrid.jsx     # Category filters, search bar, budget brackets, product cards
│   │   ├── ProductCard.jsx     # Image, price tag, showroom savings, specs, WhatsApp CTA
│   │   ├── ProductModal.jsx    # Full specifications, materials, warranty, custom quote request
│   │   ├── CustomBanner.jsx    # Custom sizing & color inquiry banner
│   │   ├── AdminImporter.jsx   # Smart "Paste & Parse" Facebook Marketplace text to JSON
│   │   └── Footer.jsx          # Workshop details, delivery info, Facebook link
│   ├── data/
│   │   ├── products.json       # Pre-seeded catalog of 28 listings
│   │   └── siteConfig.json     # Business phone, WhatsApp, workshop address
│   ├── utils/
│   │   ├── parser.js           # Heuristic regex parser for FB Marketplace listing text
│   │   └── whatsapp.js         # Generates encoded WhatsApp URLs with custom query text
│   ├── App.jsx                 # Main layout and state management
│   ├── index.css               # Tailwind directives and custom luxury theme tokens
│   └── main.jsx                # Application entry point
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 3. Data Schema & Catalog Seeding

### 3.1 Product Schema (`products.json`)
```json
{
  "id": "fff-001",
  "title": "Premium Modern Fluted Sideboard & Glass Showcase",
  "category": "Sideboards & Consoles",
  "price": 22500,
  "originalPrice": 45000,
  "size": "5 × 3 Feet",
  "isCustomizable": true,
  "material": "Premium Quality MDF Board with Toughened Tinted Glass",
  "finish": "High-Quality PU Polish for a flawless, pristine look",
  "color": "Elegant Crisp White with Rich Gold/Brass Accents",
  "warranty": "5 Years Paint/Color Fade Warranty",
  "storage": "2 closed side cabinets + spacious 2-door glass display section",
  "hardware": "Premium Quality sleek golden handles, thick metallic frames, heavy-duty hinges",
  "features": [
    "Vertical fluted (ribbed) side panels",
    "Sleek reflective top surrounded by a gold border",
    "Luxurious center glass showcase for crockery/decor",
    "Custom size & color available upon request",
    "Factory Price Rate Direct from Manufacturer",
    "Delivery all over India"
  ],
  "image": "fluted-sideboard-showcase.jpg",
  "badge": "Best Seller",
  "inStock": true
}
```

### 3.2 Pre-Seeded Catalog (28 Listings)
1. **Sideboards & Consoles (12 items)**
   - `fff-001`: Premium Modern Fluted Sideboard & Glass Showcase (₹22,500)
   - `fff-002`: Premium Modern Emerald Green Sideboard Cabinet (₹21,500)
   - `fff-003`: Premium Modern Fluted Sideboard & Display Cabinet (₹14,000)
   - `fff-004`: Premium Modern Fluted Glass-Door Sideboard Cabinet (₹22,500)
   - `fff-005`: Premium Modern Fireplace Sideboard & Display Cabinet (₹29,000)
   - `fff-006`: Premium Modern 3D Textured Sideboard Cabinet (₹24,500)
   - `fff-007`: Premium Modern Fluted Sideboard Cabinet with Marble-Finish Top (₹19,000)
   - `fff-008`: Premium Modern Luxury Fluted Sideboard Cabinet (₹20,500)
   - `fff-009`: Premium Modern Abstract Art Sideboard Cabinet (₹24,000)
   - `fff-010`: Premium Modern Fluted 3-Door Sideboard Cabinet (₹21,000)
   - `fff-011`: Premium LED Display Sideboard Cabinet (₹20,000)
   - `fff-012`: Premium Modern Sideboard Cabinet / Storage Cabinet (₹24,000)
2. **Display, Crockery & Bar Cabinets (5 items)**
   - `fff-013`: Premium Modern Geometric Fretwork Display Cabinet (₹20,500)
   - `fff-014`: Premium Modern 3D Textured Display & Crockery Cabinet (₹27,500)
   - `fff-015`: Premium Modern Abstract Art Display Cabinet & Bar Unit (₹26,000)
   - `fff-016`: Premium Modern LED Display Cabinet (₹25,000)
   - `fff-017`: Premium 3 Door LED Display Cabinet / Crockery Showcase (₹31,500)
3. **LED Dressing Tables (4 items)**
   - `fff-018`: Premium Modern LED Mirror Dressing Table (₹17,000)
   - `fff-019`: Premium Modern LED Dressing Table (₹20,000)
   - `fff-020`: Premium LED Dressing Table with Touch Mirror (₹18,000)
   - `fff-021`: Premium LED Dressing Table with Mirror & Modern Storage (₹21,000)
4. **Fluted Wardrobes & Almirahs (3 items)**
   - `fff-022`: Premium Modern Fluted Wardrobe with Mirror (₹38,000)
   - `fff-023`: Premium Modern Geometric Fluted Wooden Wardrobe (₹29,000)
   - `fff-024`: Premium Modern Fluted Wardrobe / Almirah (₹28,000)
5. **Modern Pooja Mandirs (2 items)**
   - `fff-025`: Premium MDF Pooja Mandir / Modern Home Temple 36×30×17 (₹12,000)
   - `fff-026`: Premium MDF Pooja Mandir / Modern Temple Unit White Finish (₹14,000)
6. **Storage & Multipurpose (2 items)**
   - `fff-027`: Premium Storage Cabinet / Modern Sideboard Cabinet (₹20,000)
   - `fff-028`: Premium Storage Cabinet (₹5,500)

---

## 4. User Experience & Core Features

### 4.1 Hero & Trust Value Proposition
- Clear headline: *"Architectural Luxury Furniture at Direct Factory Rates"*
- Sub-headline: *"Crafted in our Delhi workshop with precision PU polish, fluted detailing, and toughened glass. Delivered straight to your doorstep across India."*
- 4 Trust Pillars:
  1. **Direct Manufacturer Pricing** (No retail markups)
  2. **Automotive-Grade PU Polish** (Smooth, durable, non-yellowing)
  3. **5-Year Color & Build Warranty** (Confidence in every piece)
  4. **Custom Sizing & Shades** (Built to fit client spaces perfectly)

### 4.2 Interactive Filtering & Browsing
- **Category Filter**: Pills for All Designs, Sideboards, Display & Bar Cabinets, LED Dressers, Wardrobes, and Mandirs.
- **Budget Filter**: All | Under ₹20,000 | ₹20,000–₹28,000 | ₹28,000+.
- **Search Bar**: Live keyword matching across title, materials, and features.

### 4.3 High-Converting Product Card
- Image display with luxury SVG silhouette placeholder when local image is missing.
- Badge: "Factory Price" or "Best Seller".
- Price Display: Current factory rate in large font + estimated retail price strikethrough showing direct savings.
- Specs pills: Dimensions (`5 × 3 Feet`), Material, Finish.
- Action Buttons:
  - **"Details & Specs"**: Opens deep-dive modal.
  - **"WhatsApp Order"**: Directly opens WhatsApp with pre-composed inquiry.

### 4.4 Product Details Modal
- Full image view.
- Complete specs breakdown: Dimensions, Material, Polish/Finish, Color, Hardware, Storage compartments, Warranty.
- "Custom Size & Color" badge.
- Interactive WhatsApp Button with customized inquiry options (e.g. asking for custom dimensions or videos of the piece).

### 4.5 Built-In FB Marketplace Paste-to-JSON Admin Tool
Accessible via an "Add Listing" button:
1. User pastes raw FB Marketplace description text.
2. Parser extracts: Title, Price, Dimensions, Category, Materials, Finish, Warranty, and Features.
3. User verifies fields and adds image filename.
4. 1-click actions:
   - **Download `products.json`**: Downloads full updated catalog file.
   - **Copy JSON Snippet**: For direct editing.
   - **Preview in Live Catalog**: Saves temporarily to browser `localStorage` to verify look on the live site.

---

## 5. Deployment Strategy (GitHub Pages Manual Deploy)

- **Manual Deploy Command**:
  ```bash
  npm run build
  npm run deploy
  ```
- Uses the `gh-pages` package to push the built `dist/` directory directly to the `gh-pages` branch on the repository.
- Vite configuration `base: './'` ensures all script and asset URLs resolve properly regardless of GitHub repo subpath.

---

## 6. Verification Plan

1. **Build Verification**:
   - Run `npm run build` to confirm clean zero-error production build.
2. **Catalog Integrity**:
   - Verify all 28 items load with correct prices, categories, and dimension tags.
3. **Interactive Testing**:
   - Test category filtering, search, and budget filters.
   - Test product details modal opening and closing.
   - Test WhatsApp lead link generation (verifying proper URL encoding and pre-filled message text).
4. **Parser Verification**:
   - Paste sample Facebook Marketplace listing text into the Admin Importer and verify accurate field extraction.
