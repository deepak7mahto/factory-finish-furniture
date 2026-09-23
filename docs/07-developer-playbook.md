# 07. Developer & Operational Playbook

This document is the operational guide for day-to-day maintenance, local development, testing, deployments, and troubleshooting for Factory Finish Furniture.

---

## 1. Prerequisites & Environment Setup

* **Operating System:** macOS, Linux, or Windows (WSL recommended)
* **Node.js:** `v22.12.0` or higher (verified on Node `v24.18.0`)
* **Package Manager:** `npm` v10+ (configured with npm workspaces)
* **Git:** Installed and configured with push rights to `origin/main`

### Initial Repository Setup:
```bash
# Clone the repository
git clone https://github.com/deepak7mahto/factory-finish-furniture.git
cd factory-finish-furniture

# Install dependencies across all workspaces
npm install
```

---

## 2. CLI Commands Reference

All commands are executed from the **monorepo root directory**:

```bash
# --- Development Servers ---
npm run dev:web        # Starts Vite storefront at http://localhost:5173
npm run dev:studio     # Starts local Sanity Studio preview at http://localhost:3333

# --- Automated Testing ---
npm run test           # Executes catalog integrity, price-hidden, and SEO tests

# --- Production Builds ---
npm run build:web      # Builds production web bundle to web/dist/
npm run build:studio   # Compiles Sanity Studio bundle

# --- Deployment ---
npm run deploy         # Publishes web/dist/ to GitHub Pages (gh-pages branch)
```

---

## 3. How to Deploy Changes

### A. Deploying Storefront / UI Changes:
```bash
# 1. Run tests to ensure catalog and SEO integrity
npm run test

# 2. Build and publish to GitHub Pages
npm run build:web
npm run deploy

# 3. Commit and push source files to main
git add .
git commit -m "Update homepage hero banner and layout"
git push origin main
```

### B. Deploying Sanity Studio Schema Changes:
```bash
# 1. Change to studio directory
cd studio

# 2. Deploy schema documents to Content Lake
npx sanity schema deploy

# 3. Deploy Studio bundle to factoryfinishfurniture.sanity.studio
npx sanity deploy

# 4. Return to root and commit
cd ..
git add studio/
git commit -m "Update schema definitions"
git push origin main
```

---

## 4. How to Add a New Furniture Listing

There are two methods to add a product:

### Method 1: Via Sanity Studio (Recommended for Content Managers)
1. Open **[https://factoryfinishfurniture.sanity.studio](https://factoryfinishfurniture.sanity.studio)**.
2. Under **Content**, click **Furniture Product** > **+ Create**.
3. Fill in:
   * Title, Category, Size, Material, Finish, Color, Warranty.
   * Highlight Badge (e.g. *Trending* or *New Design*).
   * Internal Storage & Hardware details.
4. Upload 2+ clear photos from the factory floor.
5. Provide alt text for accessibility and SEO.
6. Click **Publish**.

### Method 2: Programmatically via Batch Script
1. Add product entry to `web/src/data/products.json`.
2. Place photos into `web/public/images/products/<id>/`.
3. Run the automated uploader:
   ```bash
   node scripts/upload-all-images-to-sanity.cjs
   ```

---

## 5. Troubleshooting Common Issues

### Issue 1: "TypeError: Cannot read properties of null (reading 'useContext')"
* **Cause:** NPM hoisted a duplicate instance of React 18 to the root while Studio used React 19.
* **Fix:** Ensure both `web/package.json` and `studio/package.json` specify `react: "^19.3.0"` and `react-dom: "^19.3.0"`, then run `rm -rf node_modules package-lock.json && npm install`.

### Issue 2: "Studio is not fully compatible with Dashboard / Content Agent is not supported"
* **Cause:** Studio is on an older version (< v5.1) or missing `appId` in `sanity.cli.ts`.
* **Fix:** Ensure `sanity` is `^6.16.0` and `studio/sanity.cli.ts` includes:
  ```typescript
  deployment: {
    appId: 'i4yxt5c9smjht6q4v2vwmy73',
  }
  ```
  Then run `npx sanity schema deploy && npx sanity deploy`.

### Issue 3: "Highlight Badge: Value did not match any allowed values"
* **Cause:** A badge in `products.json` is not listed in `studio/schemaTypes/product.ts`.
* **Fix:** Add the badge string to `options.list` in `studio/schemaTypes/product.ts` and run `cd studio && npx sanity schema deploy && npx sanity deploy`.

### Issue 4: "CORS error when fetching products from custom domain"
* **Cause:** The domain is not whitelisted in Sanity project settings.
* **Fix:** Run:
  ```bash
  cd studio
  npx sanity cors add https://factoryfinishfurniture.com --credentials
  npx sanity cors add https://www.factoryfinishfurniture.com --credentials
  ```

### Issue 5: "Custom domain 404 or points to github.io instead of factoryfinishfurniture.com"
* **Cause:** `CNAME` file missing from build output.
* **Fix:** Ensure `web/public/CNAME` exists with `factoryfinishfurniture.com`. Vite copies all files in `public/` into `dist/` automatically during `npm run build:web`.
