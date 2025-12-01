import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  formatters: {
    css: true,
    html: true,
    markdown: true,
  },
  ignores: [
    './pnpm-workspace.yaml',
  ],
})
