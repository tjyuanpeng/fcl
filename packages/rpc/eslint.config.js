import config from '@falconix/configs/eslint.config.lib.js'

export default config.overrideRules({
  'no-console': ['error', { allow: ['warn', 'error', 'debug'] }],
})
