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
          300: '#f6d585',
          400: '#eec15b',
          500: '#d4af37', // rich metallic gold
          600: '#b89428',
          700: '#94731c',
        },
        charcoal: {
          800: '#1e2124',
          850: '#181a1d',
          900: '#121416',
          950: '#0c0d0f',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
