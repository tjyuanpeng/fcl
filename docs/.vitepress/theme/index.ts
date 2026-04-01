import type { Theme } from 'vitepress'
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from '@falconix/fep'
import DefaultTheme from 'vitepress/theme'
import '@falconix/fep/theme-chalk/base.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.provide(ID_INJECTION_KEY, {
      prefix: 100,
      current: 0,
    })
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
  },
} satisfies Theme
