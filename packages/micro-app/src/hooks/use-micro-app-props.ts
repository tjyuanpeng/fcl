import type { Ref } from 'vue'
import { readonly, ref, watch } from 'vue'
import { emitEvent } from './emit-event'
import { onEvent } from './on-event'

export const useMicroAppProps = (defaultValue?: Partial<$WujieXProps>, { readonly: isReadOnly = true } = {}): Ref<$WujieXProps> => {
  const props = ref<$WujieXProps>(Object.assign({}, window.$wujie?.props, defaultValue))

  if (window.__WUJIE) {
    onEvent(`@wujie-x/props-change:${(window.__WUJIE as any).id}` as 'WujieXCustomEvent', () => {
      props.value = window.$wujie?.props as any
    })
    if (!isReadOnly) {
      watch(props, () => {
        emitEvent(`@wujie-x-vue/update-props:${(window.__WUJIE as any).id}` as 'WujieXCustomEvent', props.value)
      }, { deep: true })
    }
  }

  return isReadOnly ? readonly(props) : props
}
