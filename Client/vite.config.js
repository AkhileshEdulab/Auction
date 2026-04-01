import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
 plugins: [
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 1000, // default is 500 (in KB)
  }
})
