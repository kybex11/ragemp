import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: './', // чтобы работало в локальных html
  build: {
    outDir: '../client_packages/ui', // путь в RAGE клиент
    emptyOutDir: true,
    target: 'es2015', // ES5/ES6 — в зависимости от поддержки CEF
    minify: true,
  },
});