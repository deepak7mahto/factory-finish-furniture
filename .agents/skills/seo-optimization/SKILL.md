---
name: seo-optimization
description: Guidelines and standards for SEO, Schema.org JSON-LD structured data, Open Graph sharing cards, and Core Web Vitals for Factory Finish Furniture.
---

# Factory Finish Furniture SEO & Metadata Guidelines

## Core Principles

1. **Domain Anchoring**:
   - Always use `https://factoryfinishfurniture.com/` as the canonical origin. Never use `.github.io` URLs in meta tags, sitemaps, or structured data.

2. **Schema.org Structured Data**:
   - Maintain `FurnitureStore` (LocalBusiness) schema with contact telephone `+918826236138`, Delhi address, and business hours.
   - Maintain `FAQPage` schema to qualify for Google SERP rich snippet expandable cards.
   - Validate that all JSON-LD blocks are parseable JSON with `@context: "https://schema.org"`.

3. **Core Web Vitals & Image Optimization**:
   - Always pass `index` to `ProductCard`.
   - The first 2 catalog cards are LCP candidates: use `fetchPriority="high"` and omit `loading="lazy"`.
   - Subsequent cards must use `loading="lazy"`.
   - Never combine `fetchPriority="high"` with `loading="lazy"`.
   - Provide rich `alt` descriptions (`${product.title} - Handcrafted Luxury Furniture Delhi`).

4. **Crawlers & Indexing**:
   - `public/robots.txt` must declare `Allow: /` and point to `https://factoryfinishfurniture.com/sitemap.xml`.
   - Update `<lastmod>` in `public/sitemap.xml` whenever major catalog changes are deployed.

5. **Deploy Safety**:
   - `public/CNAME` must contain `factoryfinishfurniture.com`.
   - Always verify `cat dist/CNAME` after `npm run build` before executing `npm run deploy`.
