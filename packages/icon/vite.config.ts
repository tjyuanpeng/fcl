import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import fs from 'fs-extra'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-assets-plugin',
      writeBundle: async () => fs.copySync(resolve(__dirname, 'src/assets'), resolve(__dirname, 'dist/assets')),
    },
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Vue3IconfontComponent',
      fileName: format => `vue3-iconfont-component.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
