import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  resolve: {
    alias: {
      Components: "/src/Components",
      Pages: "/src/Pages",
      Assets: "./src/Assets",
      Helper: "./src/Helper",
      Configs: "./src/Configs",
      Layout: "./src/Layout",
      Redux: "./src/Redux",
      Routes: "./src/Routes",
    }
  },
})