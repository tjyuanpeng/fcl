<script lang="ts" setup>
import type { RendererElement } from 'vue'
import { computed } from 'vue'

defineOptions({
  name: 'FSplitPanelSubTransition',
})
const props = defineProps<{
  vertical: boolean
}>()

const reset = (el: RendererElement) => {
  el.style.width = ''
  el.style.height = ''
}
const dimension = computed(() => props.vertical ? 'height' : 'width')
const dimensionOffset = computed(() => props.vertical ? 'offsetHeight' : 'offsetWidth')
const on = {
  beforeEnter(el: RendererElement) {
    el.style[dimension.value] = 0
  },
  enter(el: RendererElement) {
    el.style[dimension.value] = 'auto'
    const value = el[dimensionOffset.value]
    el.style[dimension.value] = 0
    // eslint-disable-next-line ts/no-unused-expressions
    el[dimensionOffset.value]
    el.style[dimension.value] = `${value}px`
  },
  afterEnter(el: RendererElement) {
    reset(el)
  },
  enterCancelled(el: RendererElement) {
    reset(el)
  },
  beforeLeave(el: RendererElement) {
    el.style[dimension.value] = `${el[dimensionOffset.value]}px`
  },
  leave(el: RendererElement) {
    el.style[dimension.value] = 0
  },
  afterLeave(el: RendererElement) {
    reset(el)
  },
  leaveCancelled(el: RendererElement) {
    reset(el)
  },
}
</script>

<template>
  <transition name="f-split-panel__sub--transition" v-on="on">
    <slot />
  </transition>
</template>

<style>
.f-split-panel__sub--transition-enter-active,
.f-split-panel__sub--transition-leave-active {
  overflow: hidden;
  transition-property: width height opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.f-split-panel__sub--transition-enter-from,
.f-split-panel__sub--transition-leave-to {
  opacity: 0;
}
</style>
