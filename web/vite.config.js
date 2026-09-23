import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative assets work on GitHub Pages regardless of repo subpath
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        flutedSideboards: resolve(__dirname, 'blog/fluted-sideboards-delhi/index.html'),
        puPolish: resolve(__dirname, 'blog/pu-polish-guide/index.html'),
        crockeryUnits: resolve(__dirname, 'blog/modern-crockery-units/index.html'),
        poojaMandir: resolve(__dirname, 'blog/wooden-pooja-mandir-designs/index.html'),
      },
    },
  },
});
