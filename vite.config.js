import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'
import { createHtmlPlugin } from "vite-plugin-html";
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      viteNext: true,
    }),
    svgLoader(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    }
  }
})
