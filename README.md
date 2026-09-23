# Factory Finish Furniture (Monorepo)

> **Live Website:** [https://factoryfinishfurniture.com](https://factoryfinishfurniture.com)
> **Sanity Studio (CMS):** [https://factoryfinishfurniture.sanity.studio](https://factoryfinishfurniture.sanity.studio) (or local: `npm run dev:studio`)

Luxury architectural furniture catalog website for **Manish Prasad's Delhi factory workshop**. Browse 28 handcrafted designs — fluted sideboards, glass showcases, LED dressing tables, designer wardrobes, and pooja mandirs — with live content managed via **Sanity.io Headless CMS**.

---

## Monorepo Architecture

```text
factory-finish-furniture/
├── web/       # React 18 + Vite 6 frontend & multi-page blog (GitHub Pages)
├── studio/    # Sanity Studio v3 Headless CMS (Project: th649m10, Dataset: production)
└── package.json (npm workspaces orchestrator)
```

## Documentation & Knowledge Base

Comprehensive architectural, operational, and commercial documentation is located in the **[`docs/`](docs/)** directory:

- 📖 **[Documentation Master Index](docs/README.md)**
- 🏗️ **[01. Architecture & Technology Stack](docs/01-architecture-and-stack.md)**
- 🏷️ **[02. Business Rules & Brand Identity (Price-Hidden Architecture)](docs/02-business-rules-and-brand.md)**
- 🪚 **[03. Catalog Specifications & Craftsmanship Standards](docs/03-catalog-specifications.md)**
- ☁️ **[04. Sanity Headless CMS Guide & Studio Operations](docs/04-sanity-cms-guide.md)**
- 🖼️ **[05. Data Pipelines, Media Assets & Synchronization](docs/05-data-pipelines-and-assets.md)**
- 🔍 **[06. SEO, Structured Data & Content Marketing Strategy](docs/06-seo-and-content-strategy.md)**
- 🛠️ **[07. Developer & Operational Playbook](docs/07-developer-playbook.md)**

---

## Features

- **28 Verified Designs** — Every item is an authentic creation from the Delhi factory workshop
- **Sanity.io Headless CMS** — Multi-user management (Admin + Content Manager) for products, design guides, and photos
- **Direct WhatsApp Quotation** — No published prices; quotes are customized based on dimensions, finish, and delivery location
- **Custom Sizing** — All furniture is made-to-order with configurable dimensions, PU polish colors, and shelf layouts
- **5-Year Warranty** — Automotive-grade PU polish with guaranteed protection against fading, chipping, and workmanship defects
- **Pan-India Delivery** — Secure wooden crating and transit insurance for doorstep delivery anywhere in India

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend UI | React 18, Vite 6, Tailwind CSS 3, Lucide React (`web/`) |
| Headless CMS | Sanity Studio v3 (`studio/`), `@sanity/client`, `@sanity/image-url` |
| Hosting | GitHub Pages (Custom domain: `factoryfinishfurniture.com`) |
| SSL | Let's Encrypt (auto-provisioned by GitHub Pages) |

---

## Quick Start & Development

From the root directory:

```bash
npm install            # Install dependencies for both web and studio

# Run Development Servers
npm run dev:web        # Start Vite frontend at http://localhost:5173
npm run dev:studio     # Start Sanity Studio at http://localhost:3333

# Run Tests & Builds
npm run test           # Run catalog, utility, and SEO test suites
npm run build:web      # Build production frontend to web/dist/
npm run build:studio   # Build Sanity Studio bundle

# Deploy Frontend to GitHub Pages
npm run deploy         # Publishes web/dist to gh-pages branch
```

---

## Sanity.io CMS: Multi-User Collaboration Setup

1. **Invite Your Content Manager**:
   - Go to [Sanity Project Members](https://www.sanity.io/organizations/ozg7kfdfp/project/th649m10/members)
   - Click **"Invite Member"** and enter your content manager's email.
   - Assign the **"Editor"** role (grants permission to upload photos, create products, and write guides without access to billing or project deletion).

2. **Deploy Studio to Cloud (Free)**:
   ```bash
   cd studio
   npx sanity login       # Authenticate once in browser
   npx sanity deploy      # Deploys to https://factoryfinishfurniture.sanity.studio
   ```

3. **CORS Origins**:
   - `http://localhost:5173` (Local testing)
   - `https://factoryfinishfurniture.com` (Live production)

---

## SEO & Discoverability

- **Multi-Page Static Blog & Buying Guides** — 4 in-depth architectural guides (`/blog/`) with pre-rendered HTML:
  - `/blog/fluted-sideboards-delhi/` — Living & dining room console sizing and style guide
  - `/blog/pu-polish-guide/` — Automotive PU finish vs Melamine vs Laminate comparison
  - `/blog/modern-crockery-units/` — Tinted glass and concealed LED display cabinets
  - `/blog/wooden-pooja-mandir-designs/` — Vastu-compliant apartment temple designs
- **Schema.org JSON-LD** — `FurnitureStore`, `FAQPage`, and `Article` structured data for Google rich snippets
- **Open Graph & Twitter Cards** — Rich preview cards with 960×720 images for WhatsApp, LinkedIn, Facebook, and Twitter/X sharing
- **Core Web Vitals** — `fetchpriority="high"` on LCP images, `loading="lazy"` on below-fold cards

---

## DNS Configuration (GoDaddy → GitHub Pages)

| Record | Host | Value |
|--------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | deepak7mahto.github.io. |

---

## Contact

**WhatsApp:** [+91 88262 36138](https://wa.me/918826236138)
**Workshop:** Delhi NCR, India

## License

Private. All rights reserved.
