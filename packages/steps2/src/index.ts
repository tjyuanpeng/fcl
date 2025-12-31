import type { App } from 'vue'
import type { Props } from './components/index.vue'
import FSteps2 from './components/index.vue'
import FSteps2Item from './components/item.vue'

FSteps2.install = (app: App) => {
  app.component(FSteps2.name ?? 'FSteps2', FSteps2)
}

FSteps2.Item = FSteps2Item

export default FSteps2

export {
  FSteps2,
}

export type {
  Props,
}
