import { getCurrentInstance, onActivated, onMounted } from 'vue'
import { $on } from './event'

export const onMicroAppActivated = (callback: () => void, options: { immediate?: boolean | 'onMounted' | 'onActivated' } = {}): () => void => {
  let stop = (): void => {}
  if (window.__WUJIE) {
    stop = $on(`@wujie-x/app-activated:${(window.__WUJIE as any).id}` as '@wujie-x/app-activated', callback)
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
