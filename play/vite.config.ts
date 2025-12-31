import fs from 'node:fs'
import path from 'node:path'
import { FepResolver } from '@falconix/fep-resolver'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import Pages from 'vite-plugin-pages'

export default defineConfig(() => {
  const env = checkAndLoadEnv()
  return {
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
      proxy: {
        '/api': {
          target: env.PROXY_TARGET,
          changeOrigin: true,
        },
      },
    },
  }
})

function checkAndLoadEnv() {
  const content = `PROXY_TARGET=https://dev.yingmai.net:9001/
# PROXY_TARGET=https://test.yingmai.net:9001/
# PROXY_TARGET=https://pre.yingmai.net:9001/
# PROXY_TARGET=https://www.yingmai.net/
`
  const filePath = path.join(__dirname, '.env.local')
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf-8')
  }
  return loadEnv('', __dirname, '')
}
