import type { App } from 'vue'
import FAutoSave from './components/index.vue'

export type { Props } from './components/index.vue'
export type { AutoSaveStatus, StorageLike, UseAutoSaveOptions, UseAutoSaveReturn } from './useAutoSave'
export { useAutoSave } from './useAutoSave'

FAutoSave.install = (app: App) => {
  app.component(FAutoSave.name ?? 'FAutoSave', FAutoSave)
}

export default FAutoSave

export {
  FAutoSave,
}
