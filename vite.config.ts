import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  // No sourcemaps in the deployed build: they triple the upload for no benefit
  // when the source is already public on GitHub.
  build: { outDir: 'dist', sourcemap: false },
});
