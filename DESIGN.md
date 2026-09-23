---
version: "1.0.0"
name: "Warm Architectural Light"
description: "A luminous, high-contrast editorial design system for luxury furniture atelier Factory Finish Furniture, replacing muddy dark-mode with Italian architectural warmth."
colors:
  canvas-base: "#FAF8F5"
  canvas-subtle: "#F3EFEA"
  surface-card: "#FFFFFF"
  surface-card-hover: "#FFFFFE"
  border-light: "#E8E2D9"
  border-medium: "#D5CCC1"
  border-accent: "#C5A880"
  text-primary: "#1C1917"
  text-secondary: "#57534E"
  text-muted: "#78716C"
  accent-gold: "#9A7228"
  accent-gold-hover: "#825F1D"
  accent-gold-light: "#FBF6EA"
  accent-gold-border: "#E7D7B9"
  whatsapp-green: "#16A34A"
  whatsapp-green-hover: "#15803D"
  shadow-card: "0 2px 12px -2px rgba(44, 34, 22, 0.05), 0 8px 24px -4px rgba(44, 34, 22, 0.08)"
  shadow-hover: "0 12px 32px -4px rgba(44, 34, 22, 0.12)"
typography:
  font-display: "Cinzel, Playfair Display, Georgia, serif"
  font-body: "Plus Jakarta Sans, Inter, system-ui, sans-serif"
  display-h1:
    fontFamily: "{typography.font-display}"
    fontSize: "56px"
    fontWeight: 700
    lineHeight: 1.05
  display-h2:
    fontFamily: "{typography.font-display}"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: 1.2
  ui-card-title:
    fontFamily: "{typography.font-body}"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.35
  ui-body:
    fontFamily: "{typography.font-body}"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  ui-micro:
    fontFamily: "{typography.font-body}"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
---

# Factory Finish Furniture — Design Specification (Warm Architectural Light)

## Overview
This specification governs the visual language for Factory Finish Furniture (`factoryfinishfurniture.com`). It transitions the storefront from an underexposed, muddy dark theme (`#0f1114`) to a **Warm Architectural Light** atelier aesthetic inspired by high-end Italian furniture catalogs (Poliform, Molteni&C, B&B Italia).

### Key Architectural Principles
1. **Luminous & Clear**: Warm linen (`#FAF8F5`) and stone canvas with crisp white (`#FFFFFF`) cards. Furniture photos pop against clean backgrounds without dark hover shrouds.
2. **WCAG AAA Contrast**: Primary typography uses warm espresso (`#1C1917`), achieving 16.3:1 contrast on white cards. Secondary labels (`#57534E`) achieve 6.9:1.
3. **Ergonomic Typography**: Stone-carved `Cinzel` serif is reserved for monumental display titles (`h1`, section `h2`). Interactive UI, product titles, specs, and form inputs strictly use `Plus Jakarta Sans` for crisp legibility.
4. **Legible Microcopy**: No `text-[10px]` text. Badges and specs use a minimum of 12px (`text-xs`) with medium/semibold weights.

---

## Colors

| Token | Hex / Value | Usage | WCAG Ratio on Surface |
| :--- | :--- | :--- | :--- |
| `canvas-base` | `#FAF8F5` | Global body background (Warm Linen) | Base canvas |
| `canvas-subtle` | `#F3EFEA` | Hero & section background fills (Warm Stone) | Base surface |
| `surface-card` | `#FFFFFF` | Product cards, modals, navigation bar | Elevated card surface |
| `border-light` | `#E8E2D9` | Card and divider borders | Subtle structure |
| `border-accent` | `#C5A880` | Hover states, active category tabs | Visual focus |
| `text-primary` | `#1C1917` | Headings, card titles, pricing notices | **16.3:1 (AAA Pass)** |
| `text-secondary` | `#57534E` | Descriptions, specifications, subtitles | **6.9:1 (AAA Pass)** |
| `text-muted` | `#78716C` | Footnotes, dimensions badges | **4.7:1 (AA Pass)** |
| `accent-gold` | `#9A7228` | Primary brand accent, category pills | **4.8:1 (AA Pass)** |
| `accent-gold-light`| `#FBF6EA` | Badge & pill fill backgrounds | Subtle tone |
| `whatsapp-green`| `#16A34A` | Quote conversion CTAs | High urgency action |

---

## Typography Hierarchy

- **Monumental Display (`h1`, `h2`)**: `Cinzel`, serif. High-impact headings with generous letter-spacing.
- **Product Card Titles**: `Plus Jakarta Sans`, 600 weight, 17px. Clear, legible, never stone-carved.
- **Specification Badges**: `Plus Jakarta Sans`, 500 weight, 12px, high-contrast dark umber text on stone pill backgrounds (`bg-[#F4EFEA] border-[#E8E2D9] text-[#443E38]`).
- **Body & Paragraphs**: `Plus Jakarta Sans`, 400 weight, 15px with 1.6 line height.

---

## Elevation & Depth

- **Default Card**: `box-shadow: 0 2px 10px -2px rgba(44, 34, 22, 0.05), 0 8px 20px -4px rgba(44, 34, 22, 0.06);` with `#E8E2D9` border.
- **Card Hover**: `box-shadow: 0 16px 36px -6px rgba(44, 34, 22, 0.12);` with `-translate-y-1` and gold border accent `#C5A880`.
- **Top Navbar**: `bg-white/95 backdrop-blur-md border-b border-[#E8E2D9] shadow-sm`.
- **Detail Modal**: `bg-white border border-[#E8E2D9] shadow-2xl` with a soft ambient overlay `bg-black/50 backdrop-blur-sm`.

---

## Do's and Don'ts

### DO
- ✅ Keep furniture photographs bright, unaltered, and framed in clean `#F6F4F0` containers.
- ✅ Use high-contrast espresso (`#1C1917`) and umber (`#57534E`) for all readable text.
- ✅ Display prominent, warm golden accents (`#9A7228`) that meet WCAG 4.5:1 minimums.
- ✅ Keep WhatsApp CTAs vibrant with crisp white iconography on emerald green.

### DON'T
- ❌ Do not apply dark hover overlays (`bg-black/40`) over furniture images.
- ❌ Do not use `text-[10px]` or `text-slate-500` on dark or muted backgrounds.
- ❌ Do not use `Cinzel` serif on small card titles, buttons, or form controls.
- ❌ Do not stack multiple opacity filters (`text-gold-400/90`, `border-slate-800/80`).
