import type { App } from 'vue'
import type { Props } from './components/index.vue'
import FSplitPanel from './components/index.vue'

FSplitPanel.install = (app: App) => {
  app.component(FSplitPanel.name ?? 'FSplitPanel', FSplitPanel)
}

export default FSplitPanel

export {
  FSplitPanel,
}

export type {
  Props,
}
