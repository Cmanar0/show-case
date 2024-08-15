import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),  // Ensure this is pointing to your root directory
    },
  },
  test: {
    environment: 'happy-dom',
  },
})
