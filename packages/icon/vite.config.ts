import type { Declaration, PluginCreator } from 'postcss'
import type { Plugin } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import fs from 'fs-extra'
import postcss from 'postcss'
import { defineConfig } from 'vite'

const copyAssetsPlugin = (): Plugin => {
  const PostcssRenameIconfont: PluginCreator<void> = () => {
    const fixed = `iconfont-${Math.random().toString(36).slice(2, 12)}`
    return {
      postcssPlugin: 'rename-iconfont',
      Declaration(decl: Declaration) {
        if (decl.prop === 'font-family' && !decl.value.includes('iconfont-')) {
          decl.value = decl.value.replace(/iconfont/g, fixed)
        }
      },
    }
  }
  PostcssRenameIconfont.postcss = true
  return {
    name: 'copy-assets-plugin',
    closeBundle: async () => {
      const rootPath = path.resolve(__dirname)
      fs.copySync(path.join(rootPath, 'src/assets'), path.join(rootPath, 'dist/assets'))
      const content = fs.readFileSync(path.join(rootPath, 'src/assets/iconfont/iconfont.css'), { encoding: 'utf-8' })
      const result = await postcss([PostcssRenameIconfont]).process(content)
      fs.writeFileSync(path.join(rootPath, 'dist/assets/iconfont/iconfont.css'), result.css)
    },
  }
}
export default defineConfig({
  plugins: [
    vue(),
    copyAssetsPlugin(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
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
