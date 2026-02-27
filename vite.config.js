import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  base: './',   // garante que os caminhos sejam relativos
  build: {
    outDir: 'dist'
  }
})