import type { ConfigEnv } from 'vite'
import path from 'node:path'
import { FepResolver } from '@falconix/fep-resolver'
import fs from 'fs-extra'
import { globbySync } from 'globby'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitepress'

export default ({ mode }: ConfigEnv) => {
  const isProd = mode === 'production'
  if (!isProd) {
    fs.removeSync(path.resolve('src', 'packages'))
  }
  const getSidebarItems = () => {
    const items = globbySync(['*'], {
      cwd: '../packages',
      absolute: true,
      onlyDirectories: true,
      ignore: ['node_modules'],
    }).map((p) => {
      const pkgName = path.basename(p)
      if (isProd) {
        fs.copySync(path.resolve(p, 'README.md'), path.resolve('src', 'packages', `${pkgName}/README.md`))
      }
      const pkgInfo = fs.readJSONSync(path.resolve(p, './package.json'))
      return {
        text: pkgInfo.name,
        link: `/packages/${pkgName}/README`,
      }
    })
    return items
  }
  const items = getSidebarItems()

  return defineConfig({
    srcDir: isProd ? 'src' : '../',
    rewrites: isProd ? undefined : { 'docs/src/:path*': ':path*' },
    cleanUrls: true,
    title: 'FCL',
    description: 'falconix component library',
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: '主页', link: '/' },
        { text: '组件文档', link: items[0].link, activeMatch: '/packages/' },
        { text: 'FEP', link: '/fep/README', activeMatch: '/fep/' },
      ],
      socialLinks: [
        { icon: 'gitlab', link: 'http://10.168.2.105:8888/soft_group/yingmai/fe_group/fcl' },
      ],
      sidebar: {
        '/packages/': [
          { text: '组件列表', items },
        ],
        '/fep/': [
          { text: '@falconix/fep', link: '/fep/README' },
          { text: 'FEP gallery', link: '/fep/gallery' },
        ],
      },
      outline: {
        label: '页面导航',
      },
      docFooter: {
        prev: '下一页',
        next: '上一页',
      },
      lastUpdated: {
        text: '最后更新于',
      },
      search: {
        provider: 'local',
      },
    },
    vite: {
      ssr: {
        noExternal: ['@falconix/fep'],
      },
      plugins: [
        AutoImport({
          dts: `${isProd ? '' : './docs/src/'}types/auto-imports.d.ts`,
          resolvers: [FepResolver()],
          include: [/\.(vue|md)($|\?)/],
        }),
        Components({
          dts: `${isProd ? '' : './docs/src/'}types/components.d.ts`,
          resolvers: [FepResolver()],
          include: [/\.(vue|md)($|\?)/],
        }),
      ],
    },
  })
}
