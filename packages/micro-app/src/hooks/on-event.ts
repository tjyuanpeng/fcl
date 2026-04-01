import { getCurrentInstance, onActivated, onDeactivated, onMounted, onScopeDispose, onUnmounted } from 'vue'
import { bus as WujieXBus } from 'wujie-x'

export const onEvent = <T extends keyof $WujieXEventMap>(eventName: T, callback: $WujieXEventMap[T]): () => void => {
  const bus = window?.$wujie?.bus ?? WujieXBus

  let binded = false
  const bind = (): void => {
    if (!binded) {
      binded = true
      bus.$on(eventName, callback)
    }
  }
  const unbind = (): void => {
    if (binded) {
      bus.$off(eventName, callback)
      binded = false
    }
  }

  if (getCurrentInstance()) {
    onMounted(bind)
    onActivated(bind)
    onUnmounted(unbind)
    onDeactivated(unbind)
    onScopeDispose(unbind)
  } else {
    bind()
  }

  return unbind
}
