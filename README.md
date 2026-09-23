# Factory Finish Furniture

> **Live:** [https://factoryfinishfurniture.com](https://factoryfinishfurniture.com)

Luxury architectural furniture catalog website for **Manish Prasad's Delhi factory workshop**. Browse 28 handcrafted designs — fluted sideboards, glass showcases, LED dressing tables, designer wardrobes, and pooja mandirs — and request custom quotes directly via WhatsApp.

## Features

- **28 Verified Designs** — Every item is an authentic creation from the Delhi factory workshop
- **Direct WhatsApp Quotation** — No published prices; each quote is customized based on dimensions, finish, and delivery location
- **Custom Sizing** — All furniture is made-to-order with configurable dimensions, PU polish colors, and shelf layouts
- **5-Year Warranty** — Automotive-grade PU polish with guaranteed protection against fading, chipping, and workmanship defects
- **Pan-India Delivery** — Secure wooden crating and transit insurance for doorstep delivery anywhere in India

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Hosting | GitHub Pages |
| Domain | GoDaddy (factoryfinishfurniture.com) |
| SSL | Let's Encrypt (auto-provisioned by GitHub Pages) |

## SEO & Discoverability

- **Multi-Page Static Blog & Buying Guides** — 4 in-depth architectural guides (`/blog/`) with pre-rendered HTML for zero-JS Googlebot indexing and social preview cards:
  - `/blog/fluted-sideboards-delhi/` — Living & dining room console sizing and style guide
  - `/blog/pu-polish-guide/` — Automotive PU finish vs Melamine vs Laminate comparison
  - `/blog/modern-crockery-units/` — Tinted glass and concealed LED display cabinets
  - `/blog/wooden-pooja-mandir-designs/` — Vastu-compliant apartment temple designs
- **Schema.org JSON-LD** — `FurnitureStore`, `FAQPage`, and `Article` structured data for Google rich snippets
- **Open Graph & Twitter Cards** — Rich preview cards with 960×720 images for WhatsApp, LinkedIn, Facebook, and Twitter/X sharing
- **Local SEO** — Geo-targeted meta tags for Delhi NCR (`IN-DL`)
- **Core Web Vitals** — `fetchpriority="high"` on LCP images, `loading="lazy"` on below-fold cards

## Local Development

```bash
npm install
npm run dev        # Start Vite dev server at localhost:5173
npm test           # Run catalog, utils, and SEO test suites
npm run build      # Production build to dist/
npm run deploy     # Deploy dist/ to GitHub Pages (gh-pages branch)
```

## DNS Configuration (GoDaddy → GitHub Pages)

| Record | Host | Value |
|--------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | deepak7mahto.github.io. |

## Contact

**WhatsApp:** [+91 88262 36138](https://wa.me/918826236138)
**Workshop:** Delhi NCR, India

## License

Private. All rights reserved.
