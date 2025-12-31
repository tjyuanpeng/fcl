import antfu from '@antfu/eslint-config'

export default (opts = {}, ...args) =>
  antfu({
    lessOpinionated: true,
    type: 'lib',
    vue: true,
    typescript: true,
    formatters: {
      css: true,
      html: true,
      markdown: true,
    },
    ...opts,
  }, {
    rules: {
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    },
  }, ...args)
