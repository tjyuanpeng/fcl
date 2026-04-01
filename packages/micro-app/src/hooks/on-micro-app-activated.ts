import { getCurrentInstance, onActivated, onMounted } from 'vue'
import { onEvent } from './on-event'

export const onMicroAppActivated = (callback: () => void, options: { immediate?: boolean | 'onMounted' | 'onActivated' } = {}): () => void => {
  let stop = (): void => {}
  if (window.__WUJIE) {
    stop = onEvent(`@wujie-x/app-activated:${(window.__WUJIE as any).id}` as 'WujieXCustomEvent', callback)
  }

  if (options.immediate === 'onMounted' && getCurrentInstance()) {
    onMounted(callback)
  } else if (options.immediate === 'onActivated' && getCurrentInstance()) {
    onActivated(callback)
  } else if (options.immediate === true) {
    callback()
  }

  return stop
}
