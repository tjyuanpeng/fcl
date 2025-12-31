import config from '@falconix/configs/eslint/lib.js'

export default config().overrideRules({
  'no-console': ['error', { allow: ['warn', 'error', 'debug'] }],
})
