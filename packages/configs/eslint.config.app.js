import antfu from '@antfu/eslint-config'

export default antfu({
  lessOpinionated: true,
  type: 'app',
  vue: true,
  typescript: true,
  formatters: {
    css: true,
    html: true,
    markdown: true,
  },
}, {
  rules: {
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
  },
})
