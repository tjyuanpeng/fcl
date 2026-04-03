import type { Ref } from 'vue'
import { readonly, ref, watch } from 'vue'
import { $emit, $on } from './event'

export const useMicroAppProps = (defaultValue?: Partial<$WujieXProps>, { readonly: isReadOnly = true } = {}): Ref<$WujieXProps> => {
  const props = ref<$WujieXProps>(Object.assign({}, window.$wujie?.props, defaultValue))

  if (window.__WUJIE) {
    $on(`@wujie-x/props-change:${(window.__WUJIE as any).id}` as '@wujie-x/props-change', () => {
      props.value = Object.assign({}, props.value, window.$wujie?.props)
    })
    if (!isReadOnly) {
      watch(props, () => {
        $emit(`@wujie-x-vue/update-props:${(window.__WUJIE as any).id}` as '@wujie-x-vue/update-props', props.value)
      }, { deep: true })
    }
  }

  return isReadOnly ? readonly(props) : props
}
