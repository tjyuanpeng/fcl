import type { App } from 'vue'
import Icon from './components/Icon.vue'

export { Icon }

export default {
  install: (app: App) => {
    app.component('Icon', Icon)
  },
}

declare module 'vue' {
  export interface GlobalComponents {
    Icon: typeof Icon
  }
}
