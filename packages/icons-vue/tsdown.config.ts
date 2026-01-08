import type { UserConfig } from 'tsdown'
import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'
import buildIndex from './scripts/build.ts'

export default defineConfig(async () => {
  await buildIndex()
  return {
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
  } satisfies UserConfig
})
