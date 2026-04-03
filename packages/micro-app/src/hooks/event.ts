import { getCurrentInstance, onActivated, onDeactivated, onMounted, onScopeDispose, onUnmounted } from 'vue'
import { bus as WujieXBus } from 'wujie-x'

export const $emit = <T extends keyof $WujieXEventMap>(eventName: T, ...args: Parameters<$WujieXEventMap[T]>): void => {
  const bus = window?.$wujie?.bus ?? WujieXBus
  bus.$emit(eventName, ...args)
}

export const $off = <T extends keyof $WujieXEventMap>(eventName: T, callback: $WujieXEventMap[T]): void => {
  const bus = window?.$wujie?.bus ?? WujieXBus
  bus.$off(eventName, callback)
}

export const $on = <T extends keyof $WujieXEventMap>(eventName: T, callback: $WujieXEventMap[T]): () => void => {
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
      binded = false
      bus.$off(eventName, callback)
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
