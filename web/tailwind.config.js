/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./blog/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#faf8f5',
          100: '#f4efe8',
          200: '#e7dccf',
          300: '#d6c2ad',
          400: '#c2a488',
          500: '#b08a68',
          600: '#9b7353',
          700: '#7e5a42',
          800: '#674a38',
          900: '#543d30',
        },
        gold: {
          50: '#fdfbf7',
          100: '#fbf6ea',
          200: '#f5e8c7',
          300: '#ead29a',
          400: '#d4b363',
          500: '#9a7228', // rich burnished gold (WCAG 4.8:1 on light)
          600: '#805b1b',
          700: '#664714',
        },
        charcoal: {
          800: '#1e2124',
          850: '#181a1d',
          900: '#121416',
          950: '#0c0d0f',
        },
        stoneWarm: {
          50: '#faf8f5',
          100: '#f3efea',
          200: '#e8e2d9',
          300: '#d5ccc1',
          400: '#a89f91',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0f0e0d',
        }
      },
      boxShadow: {
        'warm-card': '0 2px 10px -2px rgba(44, 34, 22, 0.05), 0 8px 20px -4px rgba(44, 34, 22, 0.07)',
        'warm-hover': '0 16px 36px -6px rgba(44, 34, 22, 0.12)',
        'warm-modal': '0 25px 50px -12px rgba(44, 34, 22, 0.25)',
      },
      fontFamily: {
        display: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
