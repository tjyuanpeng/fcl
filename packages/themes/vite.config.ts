import path from 'node:path'
import { defineConfig } from 'vite'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    libInjectCss(),
    viteStaticCopy({
      targets: [
        {
          src: './src/yc/theme-chalk/*.scss',
          dest: './yc/theme-chalk/src',
        },
        {
          src: './README.md',
          dest: './',
        },
      ],
    }),
  ],
  /* css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/yc/theme-chalk/element-forward.scss" as *;`,
      },
    },
  }, */
  build: {
    lib: {
      entry: {
        yc: path.resolve(__dirname, 'src/yc/index.ts'),
      },
      formats: ['es'],
      name: '@falconix/themes',
    },
    rollupOptions: {
      external: ['element-plus', 'vue'],
      output: {
        globals: {
          'element-plus': 'ElementPlus',
          'vue': 'Vue',
        },
        entryFileNames: '[name]/index.js',
        assetFileNames: '[name]/style.css',
      },
    },
  },
})
