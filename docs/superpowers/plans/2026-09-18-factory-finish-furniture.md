# Factory Finish Furniture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a luxury D2C static showcase catalog and WhatsApp lead engine for Factory Finish Furniture, pre-seeded with 28 products from Facebook Marketplace, and deploy it to GitHub Pages.

**Architecture:** Pure client-side static application built with React 18, Vite, and Tailwind CSS. Data is stored in static JSON files (`products.json`, `siteConfig.json`). WhatsApp links are formatted client-side. An embedded "Paste & Parse" Admin tool auto-converts pasted Facebook Marketplace listings into JSON.

**Tech Stack:** React 18, Vite, Tailwind CSS, Lucide React, gh-pages.

**Spec:** `docs/superpowers/specs/2026-09-18-factory-finish-furniture-design.md`

## Global Constraints
- Target platform: GitHub Pages (`base: './'`).
- Image directory: `public/images/products/` with elegant SVG fallbacks for missing local images.
- All 28 items from the Facebook Marketplace seller profile must be included in `products.json`.
- Zero database or server runtime dependencies.

---

### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/index.css`
- Create: `src/main.jsx`

**Interfaces:**
- Produces: Working React + Vite + Tailwind build environment with `base: './'` and `gh-pages` deployment script.

- [ ] **Step 1: Create `package.json` with scripts and dependencies**
- [ ] **Step 2: Install dependencies (`npm install`)**
- [ ] **Step 3: Create `vite.config.js` with `base: './'`**
- [ ] **Step 4: Configure `tailwind.config.js`, `postcss.config.js`, and `src/index.css`**
- [ ] **Step 5: Create `index.html` and `src/main.jsx`**
- [ ] **Step 6: Verify dev/build works with minimal React component**
- [ ] **Step 7: Commit scaffolding**

---

### Task 2: Data Layer (`siteConfig.json` & 28-Item `products.json`)

**Files:**
- Create: `src/data/siteConfig.json`
- Create: `src/data/products.json`
- Create: `test/catalog.test.cjs`

**Interfaces:**
- Produces: `siteConfig.json` containing business phone, WhatsApp number, Delhi location, warranty info.
- Produces: `products.json` containing 28 structured furniture listings across 5 categories.

- [ ] **Step 1: Write `src/data/siteConfig.json`**
- [ ] **Step 2: Write complete `src/data/products.json` with all 28 items**
- [ ] **Step 3: Create verification test `test/catalog.test.cjs` validating data integrity (IDs, prices, categories, dimensions)**
- [ ] **Step 4: Run test to verify catalog validity**
- [ ] **Step 5: Commit catalog data**

---

### Task 3: Utilities (WhatsApp Link Builder, FB Marketplace Parser, Luxury SVG Fallbacks)

**Files:**
- Create: `src/utils/whatsapp.js`
- Create: `src/utils/parser.js`
- Create: `src/utils/placeholders.js`
- Test: `test/utils.test.cjs`

**Interfaces:**
- Produces: `generateWhatsAppUrl(product, customNotes)`: returns encoded `https://wa.me/...` URL.
- Produces: `parseMarketplaceText(rawText)`: returns structured product object with title, price, dimensions, category, materials.
- Produces: `getCategoryFallbackSvg(category)`: returns inline SVG data URI with luxury geometric silhouetted furniture design.

- [ ] **Step 1: Write failing tests in `test/utils.test.cjs` for URL encoding and listing parsing**
- [ ] **Step 2: Run test to confirm failure**
- [ ] **Step 3: Implement `src/utils/whatsapp.js`, `src/utils/parser.js`, and `src/utils/placeholders.js`**
- [ ] **Step 4: Run test to verify all tests pass**
- [ ] **Step 5: Commit utilities**

---

### Task 4: UI Components (Navbar, Hero, ProductCard, ProductGrid, ProductModal, Footer)

**Files:**
- Create: `src/components/Navbar.jsx`
- Create: `src/components/Hero.jsx`
- Create: `src/components/ProductCard.jsx`
- Create: `src/components/ProductGrid.jsx`
- Create: `src/components/ProductModal.jsx`
- Create: `src/components/CustomBanner.jsx`
- Create: `src/components/Footer.jsx`

**Interfaces:**
- Produces: Reusable luxury-themed UI components for browsing, filtering, viewing details, and ordering.

- [ ] **Step 1: Build `Navbar.jsx` with logo, category shortcuts, WhatsApp button, and Admin modal toggle**
- [ ] **Step 2: Build `Hero.jsx` with factory direct value proposition and 4 trust pillars**
- [ ] **Step 3: Build `ProductCard.jsx` with price comparison (factory vs retail), dimension pill, and WhatsApp quick button**
- [ ] **Step 4: Build `ProductGrid.jsx` with category tabs, search input, price range filter, and empty states**
- [ ] **Step 5: Build `ProductModal.jsx` with complete specs table, storage breakdown, warranty badges, and custom inquiry button**
- [ ] **Step 6: Build `CustomBanner.jsx` and `Footer.jsx`**
- [ ] **Step 7: Commit components**

---

### Task 5: Admin Listing Importer ("Paste & Parse")

**Files:**
- Create: `src/components/AdminImporter.jsx`

**Interfaces:**
- Produces: Modal or page tool that parses pasted FB Marketplace listing text, previews the card live, and exports JSON / saves to browser storage.

- [ ] **Step 1: Build `AdminImporter.jsx` with textarea, parse button, editable form, and live card preview**
- [ ] **Step 2: Add "Download Updated `products.json`" and "Copy JSON Snippet" buttons**
- [ ] **Step 3: Add "Test in Browser" button to inject into catalog via `localStorage`**
- [ ] **Step 4: Commit Admin Importer**

---

### Task 6: App Assembly, Verification & Build

**Files:**
- Modify: `src/App.jsx`
- Test: Production build `npm run build`

- [ ] **Step 1: Assemble full layout in `src/App.jsx` connecting state (search, filters, active modal, admin toggle)**
- [ ] **Step 2: Run all tests (`node test/catalog.test.cjs` and `node test/utils.test.cjs`)**
- [ ] **Step 3: Run production build `npm run build` to verify clean output in `dist/`**
- [ ] **Step 4: Commit assembled application**

---

### Task 7: GitHub Repository Creation & GitHub Pages Deployment

**Commands:**
- `gh repo create factory-finish-furniture --public --source=. --remote=origin --push`
- `npm run deploy`

- [ ] **Step 1: Create public GitHub repository `factory-finish-furniture` using `gh` CLI**
- [ ] **Step 2: Push `main` branch to remote origin**
- [ ] **Step 3: Deploy build output to `gh-pages` branch using `npm run deploy`**
- [ ] **Step 4: Enable GitHub Pages on the repo and obtain live deployment URL**
- [ ] **Step 5: Verify live deployment URL in browser**
