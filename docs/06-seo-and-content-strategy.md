# 06. SEO, Structured Data & Content Marketing Strategy

This document outlines the organic search discoverability strategy, Schema.org structured data implementations, and multi-page design guide architecture.

---

## 1. Organic Search Strategy (Local & Pan-India)

High-end architectural furniture is heavily searched by homeowners, interior designers, and architects in major Indian metros. The search strategy targets two primary segments:

1. **Local Delhi NCR High-Intent Searches:**
   * Keywords: *“fluted sideboard manufacturer Delhi”*, *“PU polish furniture workshop Kirti Nagar”*, *“custom mandir design Gurgaon”*, *“factory price modern crockery unit Noida”*.
   * Optimization: Local business structured data, localized landing page guides, and physical workshop geo-targeting.
2. **Pan-India Bespoke Buyer Searches:**
   * Keywords: *“luxury fluted console table online”*, *“modern temple unit with LED backlight”*, *“smart LED dressing table with touch sensor”*.
   * Optimization: Detailed craftsmanship specifications, 5-Year warranty highlights, and safe crated transit disclosures.

---

## 2. Structured Data (Schema.org JSON-LD)

The application embeds rich JSON-LD microdata directly into the `<head>` of the storefront and each design guide:

### A. `FurnitureStore` Schema (`index.html`)
Identifies Factory Finish Furniture as an authentic manufacturer and local business entity:
```json
{
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "name": "Factory Finish Furniture",
  "image": "https://factoryfinishfurniture.com/images/products/1253647393569405/photo_1.jpg",
  "@id": "https://factoryfinishfurniture.com/#store",
  "url": "https://factoryfinishfurniture.com",
  "telephone": "+91 88262 36138",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Furniture Workshop Cluster, Mangolpuri",
    "addressLocality": "New Delhi",
    "addressRegion": "Delhi",
    "postalCode": "110083",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.6924,
    "longitude": 77.0862
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "10:00",
    "closes": "20:00"
  }
}
```

### B. `FAQPage` Schema (`index.html`)
Eligible for Google Search rich accordion snippets:
* *Do you offer custom sizes and color finishes?*
* *What is the difference between PU polish and standard duco paint?*
* *How is the furniture delivered safely across India?*
* *What does the 5-Year Warranty cover?*

### C. `Article` & `CollectionPage` Schema (`blog/*.html`)
Embedded in each design guide with `headline`, `author`, `publisher`, `datePublished`, and `dateModified`.

---

## 3. Multi-Page Pre-rendered Design Guides Hub (`web/blog/`)

To capture high-intent informational search queries, we built a dedicated static blog system:

| Guide URL | Topic & Primary Search Intent |
| :--- | :--- |
| **`/blog/`** | **Design Guides Hub** (CollectionPage listing all guides) |
| **`/blog/fluted-sideboards-delhi/`** | Modern Fluted Sideboards & Consoles in Delhi NCR: Buying Guide & Factory Rates |
| **`/blog/modern-crockery-units/`** | Modern Crockery Unit Designs for Indian Dining Rooms (LED Glass Showcases) |
| **`/blog/wooden-pooja-mandir-designs/`** | Modern Wooden Pooja Mandir Designs for Apartments (Backlit CNC Jali Work) |
| **`/blog/pu-polish-guide/`** | What is PU Polish Furniture? High-Gloss vs Matte, Durability & Factory Finish |

### Key Features of Each Guide:
* **Pre-rendered HTML:** Indexed instantaneously by search crawlers without requiring clientside JavaScript hydration.
* **Direct Workshop CTAs:** Embedded sticky WhatsApp inquiry buttons allowing readers to ask for quotes on specific designs featured in the article.
* **Responsive Photo Galleries:** Highlighting real Delhi workshop builds rather than generic stock images.

---

## 4. Crawlability: Sitemaps & Robots.txt

* **`sitemap.xml` (`web/public/sitemap.xml`):**
  * Updated with priority ratings for the homepage (`1.0`) and all 5 blog guides (`0.8`).
  * Auto-copied to root during every build.
* **`robots.txt` (`web/public/robots.txt`):**
  * Explicitly allows search crawlers across all paths.
  * Declares `Sitemap: https://factoryfinishfurniture.com/sitemap.xml`.

---

## 5. Automated SEO Verification Suite

The test file `web/test/seo.test.cjs` runs during `npm run test` and validates:
1. Canonical URL correctness on homepage and all 5 blog subpages.
2. Meta description character length (120–230 characters).
3. Presence of all 7 Open Graph and Twitter Card tags.
4. Schema.org JSON-LD syntax and presence of `FurnitureStore` and `FAQPage`.
5. Sitemap and robots.txt file integrity.
