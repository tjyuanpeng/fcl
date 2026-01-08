<script setup lang="ts">
import type { VNode } from 'vue'
import type { ProvideObject } from './token'
import { getCurrentInstance, isVNode, onUpdated, provide, ref, watch } from 'vue'
import Item from './item.vue'
import { TOKEN } from './token'
import { flattedChildren } from './utils'

defineOptions({
  name: 'FSteps2',
})
const props = withDefaults(defineProps<Props>(), {
  current: -1,
  items: () => [],
})
const emit = defineEmits<{
  itemClick: [i: number]
}>()

export interface Props {
  current?: number
  items?: (string | VNode)[]
}

const vm = getCurrentInstance()!
const map = ref<Record<number, ((index: number) => void) | undefined>>({})
const reOrderChildren = () => flattedChildren(vm.subTree)
  .filter(n => isVNode(n) && n.type === Item && !!n.component)
  .map(n => map.value[(n as VNode).component!.uid])
  .filter(Boolean)
  .forEach((func: ((index: number) => void) | undefined, i) => func!(i))
watch(map, () => reOrderChildren(), { deep: true })
onUpdated(() => reOrderChildren())
const addStep = (uid: number, func: (index: number) => void) => map.value[uid] = func
const removeStep = (uid: number) => map.value[uid] = undefined
const handleItemClick = (index: number) => emit('itemClick', index)

provide<ProvideObject>(TOKEN, { props, handleItemClick, addStep, removeStep })
</script>

<template>
  <ul class="f-steps2">
    <slot>
      <Item v-for="(item, index) in items" :key="index">
        <component :is="item" v-if="isVNode(item)" />
        <template v-else>
          {{ item }}
        </template>
      </Item>
    </slot>
  </ul>
</template>

<style>
.f-steps2 {
  display: flex;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
