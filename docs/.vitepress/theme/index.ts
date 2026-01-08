import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import '@falconix/fep/theme-chalk/base.css'
import './custom.css'

export default {
  extends: DefaultTheme,
} satisfies Theme
