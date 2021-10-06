import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: "[local]_[hash:base64:5]",
      localsConvention: "dashesOnly"
    }
  }
})
