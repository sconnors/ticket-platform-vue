import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config';
import vue from "@vitejs/plugin-vue"; 
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
  plugins: [
    tailwindcss(),
    vue()
  ],
  resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
});