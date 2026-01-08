import type { ConfigEnv } from 'vite'
import path from 'node:path'
import { FepResolver } from '@falconix/fep-resolver'
import fs from 'fs-extra'
import { globbySync } from 'globby'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, postcssIsolateStyles } from 'vitepress'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'

export default ({ mode }: ConfigEnv) => {
  const isProd = mode === 'production'
  if (!isProd) {
    fs.removeSync(path.resolve('src', 'packages'))
  }
  const getPkgsItems = () => globbySync(['*'], {
    cwd: '../packages',
    absolute: true,
    onlyDirectories: true,
    ignore: ['node_modules'],
  }).map((p) => {
    if (!fs.existsSync(path.resolve(p, 'README.md'))) {
      return undefined
    }
    const projectName = path.basename(p)
    if (isProd) {
      fs.copySync(path.resolve(p, 'README.md'), path.resolve('src/packages', `${projectName}/README.md`))
    }
    const pkgInfo = fs.readJSONSync(path.resolve(p, './package.json'))
    return {
      text: pkgInfo.name,
      link: `/packages/${projectName}/README`,
    }
  }).filter(i => i) as { text: any, link: string }[]
  const pkgItems = getPkgsItems()

  return defineConfig({
    srcDir: isProd ? 'src' : '../',
    rewrites: isProd ? undefined : { 'docs/src/:path*': ':path*' },
    cleanUrls: true,
    title: 'FCL',
    description: 'falconix component library',
    markdown: {
      config(md) {
        md.use(vitepressDemoPlugin, {
          demoDir: path.resolve(__dirname, '../src/demos'),
        })
      },
    },
    themeConfig: {
      nav: [
        { text: '主页', link: '/' },
        { text: '组件文档', link: pkgItems[0].link, activeMatch: '/packages/' },
        { text: '版本看板', link: '/versions', activeMatch: '/versions/' },
        { text: '贡献代码', link: '/contribution', activeMatch: '/contribution/' },
        { text: 'FEP', link: '/fep/getting-started', activeMatch: '/fep/' },
        { text: 'FEP gallery', link: '/fep-gallery', activeMatch: '/fep-gallery/' },
        { text: 'FFD', link: '/ffd', activeMatch: '/ffd/' },
      ],
      socialLinks: [
        { icon: 'gitlab', link: 'http://10.168.2.105:8888/soft_group/yingmai/fe_group/fcl' },
      ],
      sidebar: {
        '/packages/': [
          { text: '组件列表', items: pkgItems },
        ],
        '/fep/': [
          { text: '@falconix/fep', items: [
            { text: '快速开始', link: '/fep/getting-started' },
            { text: '扩展点', link: '/fep/extends' },
            { text: 'FAQ', link: '/fep/FAQ' },
          ] },
          { text: 'FEP gallery', link: '/fep-gallery' },
        ],
        '/contribution/': [
          { text: '贡献代码', link: '/contribution/' },
        ],
        '/ffd/': [
          { text: 'FFD', link: '/ffd/' },
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
      logo: '/logo.png',
    },
    vite: {
      publicDir: isProd ? '../public' : 'docs/public',
      resolve: {
        alias: [
          {
            find: 'vitepress-demo-plugin',
            replacement: path.resolve(__dirname, '../node_modules/vitepress-demo-plugin'),
          },
        ],
      },
      ssr: {
        noExternal: ['@falconix/fep'],
      },
      css: {
        postcss: {
          plugins: [
            postcssIsolateStyles({
              includeFiles: [/vp-doc\.css/],
            }),
          ],
        },
      },
      plugins: [
        AutoImport({
          imports: ['vue'],
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
