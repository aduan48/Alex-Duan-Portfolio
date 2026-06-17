import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Keeps target definitions safe for backdrop-filters and flex layouts
    target: 'es2022', 
    cssMinify: 'esbuild', // Uses lightning-fast, structurally stable minification
    minify: 'esbuild',
  }
})