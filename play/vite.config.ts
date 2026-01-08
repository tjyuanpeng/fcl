import { FepResolver } from '@falconix/fep-resolver'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: './src/types/auto-imports.d.ts',
      resolvers: [FepResolver()],
    }),
    Components({
      dts: './src/types/components.d.ts',
      resolvers: [FepResolver()],
    }),
    Pages({
      exclude: ['**/components/*.vue'],
    }),
    vue(),
    vueJsx(),
  ],
  server: {
    port: 5174,
  },
})
