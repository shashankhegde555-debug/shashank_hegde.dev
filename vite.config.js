import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/shashank_hegde.dev/',
  plugins: [
    react(),
    tailwindcss(),
  ],
});
