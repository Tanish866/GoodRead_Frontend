import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  resolve: {
    alias: {
      Components: path.resolve(__dirname, "src/Components"),
      Pages: path.resolve(__dirname, "src/Pages"),
      Assets: path.resolve(__dirname, "src/Assets"),
      Helper: path.resolve(__dirname, "src/Helper"),
      Configs: path.resolve(__dirname, "src/Configs"),
      Layout: path.resolve(__dirname, "src/Layout"),
      Redux: path.resolve(__dirname, "src/Redux"),
      Routes: path.resolve(__dirname, "src/Routes"),
    }
  },
})