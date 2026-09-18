/**
 * Generates an architectural luxury SVG placeholder for a given furniture category
 */
export function getCategorySvg(category, title = '') {
  const c = category.toLowerCase();

  // Sideboards & Consoles
  if (c.includes('sideboard') || c.includes('console')) {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%231a1d21"/>
          <stop offset="100%" stop-color="%230f1113"/>
        </linearGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="%23d4af37"/>
          <stop offset="50%" stop-color="%23f6d585"/>
          <stop offset="100%" stop-color="%23b89428"/>
        </linearGradient>
        <pattern id="fluted" width="16" height="20" patternUnits="userSpaceOnUse">
          <line x1="8" y1="0" x2="8" y2="20" stroke="%232b2f36" stroke-width="3"/>
          <line x1="16" y1="0" x2="16" y2="20" stroke="%23181a1d" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(%23bg)"/>
      <!-- Tabletop -->
      <rect x="140" y="160" width="520" height="24" rx="4" fill="%23262a30" stroke="url(%23gold)" stroke-width="2"/>
      <!-- Body -->
      <rect x="150" y="184" width="500" height="180" rx="2" fill="url(%23fluted)" stroke="%233a3f47" stroke-width="1.5"/>
      <!-- Center Glass Showcase -->
      <rect x="280" y="195" width="240" height="158" rx="2" fill="%231f2b33" fill-opacity="0.6" stroke="url(%23gold)" stroke-width="2"/>
      <line x1="400" y1="195" x2="400" y2="353" stroke="url(%23gold)" stroke-width="1.5"/>
      <!-- Handles -->
      <line x1="390" y1="260" x2="390" y2="290" stroke="url(%23gold)" stroke-width="3" stroke-linecap="round"/>
      <line x1="410" y1="260" x2="410" y2="290" stroke="url(%23gold)" stroke-width="3" stroke-linecap="round"/>
      <!-- Legs -->
      <line x1="180" y1="364" x2="165" y2="430" stroke="url(%23gold)" stroke-width="4" stroke-linecap="round"/>
      <line x1="620" y1="364" x2="635" y2="430" stroke="url(%23gold)" stroke-width="4" stroke-linecap="round"/>
      <line x1="320" y1="364" x2="320" y2="430" stroke="url(%23gold)" stroke-width="3"/>
      <line x1="480" y1="364" x2="480" y2="430" stroke="url(%23gold)" stroke-width="3"/>
      <text x="400" y="470" fill="%23d4af37" font-family="Cinzel, serif" font-size="14" letter-spacing="3" text-anchor="middle">FACTORY FINISH • FLUTED SIDEBOARD</text>
    </svg>`;
  }

  // Display & Bar Cabinets
  if (c.includes('display') || c.includes('bar') || c.includes('crockery') || c.includes('showcase')) {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <defs>
        <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23181a1d"/>
          <stop offset="100%" stop-color="%230c0d0f"/>
        </linearGradient>
        <linearGradient id="gold2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="%23d4af37"/>
          <stop offset="100%" stop-color="%23f6d585"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(%23bg2)"/>
      <!-- Tall Display Frame -->
      <rect x="250" y="70" width="300" height="340" rx="6" fill="%231a2228" fill-opacity="0.8" stroke="url(%23gold2)" stroke-width="2.5"/>
      <!-- Shelves with LED glow -->
      <line x1="250" y1="150" x2="550" y2="150" stroke="url(%23gold2)" stroke-width="2"/>
      <line x1="250" y1="230" x2="550" y2="230" stroke="url(%23gold2)" stroke-width="2"/>
      <line x1="250" y1="310" x2="550" y2="310" stroke="url(%23gold2)" stroke-width="2"/>
      <!-- Vertical Divider -->
      <line x1="400" y1="70" x2="400" y2="410" stroke="%233a3f47" stroke-width="1.5"/>
      <!-- Warm LED Ambient glow -->
      <circle cx="400" cy="110" r="40" fill="%23f6d585" fill-opacity="0.15"/>
      <circle cx="400" cy="190" r="40" fill="%23f6d585" fill-opacity="0.15"/>
      <!-- Base Legs -->
      <line x1="280" y1="410" x2="270" y2="450" stroke="url(%23gold2)" stroke-width="4" stroke-linecap="round"/>
      <line x1="520" y1="410" x2="530" y2="450" stroke="url(%23gold2)" stroke-width="4" stroke-linecap="round"/>
      <text x="400" y="480" fill="%23d4af37" font-family="Cinzel, serif" font-size="14" letter-spacing="3" text-anchor="middle">ARCHITECTURAL DISPLAY &amp; CROCKERY UNIT</text>
    </svg>`;
  }

  // LED Dressing Tables
  if (c.includes('dressing') || c.includes('vanity') || c.includes('mirror')) {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <defs>
        <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%231a1d21"/>
          <stop offset="100%" stop-color="%230f1114"/>
        </linearGradient>
        <linearGradient id="gold3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="%23d4af37"/>
          <stop offset="100%" stop-color="%23f6d585"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(%23bg3)"/>
      <!-- Circular Backlit Mirror -->
      <circle cx="400" cy="170" r="95" fill="%23222a30" stroke="url(%23gold3)" stroke-width="3"/>
      <circle cx="400" cy="170" r="85" fill="none" stroke="%23ffffff" stroke-width="3" stroke-opacity="0.6"/>
      <!-- Vanity Tabletop -->
      <rect x="220" y="275" width="360" height="50" rx="4" fill="%23282c33" stroke="url(%23gold3)" stroke-width="1.5"/>
      <line x1="400" y1="275" x2="400" y2="325" stroke="url(%23gold3)" stroke-width="1"/>
      <circle cx="310" cy="300" r="4" fill="url(%23gold3)"/>
      <circle cx="490" cy="300" r="4" fill="url(%23gold3)"/>
      <!-- Legs -->
      <line x1="260" y1="325" x2="245" y2="430" stroke="url(%23gold3)" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="540" y1="325" x2="555" y2="430" stroke="url(%23gold3)" stroke-width="3.5" stroke-linecap="round"/>
      <text x="400" y="470" fill="%23d4af37" font-family="Cinzel, serif" font-size="14" letter-spacing="3" text-anchor="middle">TOUCH-SENSOR LED DRESSING TABLE</text>
    </svg>`;
  }

  // Fluted Wardrobes
  if (c.includes('wardrobe') || c.includes('almirah')) {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <defs>
        <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%2317191c"/>
          <stop offset="100%" stop-color="%230e1012"/>
        </linearGradient>
        <linearGradient id="gold4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="%23d4af37"/>
          <stop offset="100%" stop-color="%23f6d585"/>
        </linearGradient>
        <pattern id="wardrobe-flute" width="12" height="20" patternUnits="userSpaceOnUse">
          <line x1="6" y1="0" x2="6" y2="20" stroke="%232b2e35" stroke-width="2.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(%23bg4)"/>
      <!-- Outer Wardrobe Frame -->
      <rect x="240" y="60" width="320" height="370" rx="4" fill="%2321252b" stroke="url(%23gold4)" stroke-width="2"/>
      <!-- Left Door Fluted -->
      <rect x="248" y="68" width="100" height="354" fill="url(%23wardrobe-flute)"/>
      <!-- Center Mirror Door -->
      <rect x="350" y="68" width="100" height="354" fill="%232a353d" stroke="url(%23gold4)" stroke-width="1.5"/>
      <!-- Right Door Fluted -->
      <rect x="452" y="68" width="100" height="354" fill="url(%23wardrobe-flute)"/>
      <!-- Full Height Golden Edge Handles -->
      <line x1="345" y1="180" x2="345" y2="300" stroke="url(%23gold4)" stroke-width="3" stroke-linecap="round"/>
      <line x1="455" y1="180" x2="455" y2="300" stroke="url(%23gold4)" stroke-width="3" stroke-linecap="round"/>
      <text x="400" y="475" fill="%23d4af37" font-family="Cinzel, serif" font-size="14" letter-spacing="3" text-anchor="middle">DESIGNER FLUTED WARDROBE • ALMIRAH</text>
    </svg>`;
  }

  // Pooja Mandirs
  if (c.includes('mandir') || c.includes('temple')) {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <defs>
        <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%231c1e22"/>
          <stop offset="100%" stop-color="%230f1114"/>
        </linearGradient>
        <linearGradient id="gold5" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="%23d4af37"/>
          <stop offset="100%" stop-color="%23f6d585"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(%23bg5)"/>
      <!-- Mandir Dome / Shikhar -->
      <path d="M 400 80 Q 400 130 460 145 L 340 145 Q 400 130 400 80 Z" fill="url(%23gold5)"/>
      <circle cx="400" cy="70" r="7" fill="url(%23gold5)"/>
      <!-- Body Pillars -->
      <rect x="290" y="145" width="220" height="230" rx="4" fill="%2323282f" stroke="url(%23gold5)" stroke-width="2"/>
      <!-- CNC Jali Pattern Lines -->
      <line x1="315" y1="145" x2="315" y2="375" stroke="url(%23gold5)" stroke-width="3"/>
      <line x1="485" y1="145" x2="485" y2="375" stroke="url(%23gold5)" stroke-width="3"/>
      <!-- Sanctum Arch -->
      <path d="M 330 360 L 330 220 Q 400 170 470 220 L 470 360" fill="none" stroke="url(%23gold5)" stroke-width="2"/>
      <circle cx="400" cy="240" r="16" fill="%23f6d585" fill-opacity="0.2"/>
      <!-- Slide Tray & Base Drawer -->
      <rect x="280" y="375" width="240" height="40" rx="3" fill="%232c323a" stroke="url(%23gold5)" stroke-width="1.5"/>
      <circle cx="400" cy="395" r="4" fill="url(%23gold5)"/>
      <text x="400" y="465" fill="%23d4af37" font-family="Cinzel, serif" font-size="14" letter-spacing="3" text-anchor="middle">CONTEMPORARY POOJA MANDIR UNIT</text>
    </svg>`;
  }

  // Default / Storage
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
    <rect width="100%" height="100%" fill="%2316181b"/>
    <rect x="240" y="140" width="320" height="230" rx="6" fill="%2323282e" stroke="%23d4af37" stroke-width="2"/>
    <line x1="400" y1="140" x2="400" y2="370" stroke="%23d4af37" stroke-width="1.5"/>
    <circle cx="380" cy="255" r="5" fill="%23d4af37"/>
    <circle cx="420" cy="255" r="5" fill="%23d4af37"/>
    <line x1="280" y1="370" x2="270" y2="420" stroke="%23d4af37" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="520" y1="370" x2="530" y2="420" stroke="%23d4af37" stroke-width="3.5" stroke-linecap="round"/>
    <text x="400" y="460" fill="%23d4af37" font-family="Cinzel, serif" font-size="14" letter-spacing="3" text-anchor="middle">FACTORY FINISH LUXURY FURNITURE</text>
  </svg>`;
}
