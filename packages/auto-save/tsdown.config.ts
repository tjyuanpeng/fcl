import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export default defineConfig({
  entry: ['./src/index.ts'],
  platform: 'neutral',
  sourcemap: true,
  dts: {
    vue: true,
  },
  plugins: [
    Vue({
      isProduction: true,
    }),
  ],
})
