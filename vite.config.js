import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ include: "**/*.{js,jsx,ts,tsx}" }),  tailwindcss(),],
   test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    globals: true
  }
})
