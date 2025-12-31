<script setup lang="ts">
import type { ProvideObject } from './token'
import { getCurrentInstance, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import Head from './assets/head.vue'
import TailEnd from './assets/tail-end.vue'
import Tail from './assets/tail.vue'
import { TOKEN } from './token'

defineOptions({
  name: 'FSteps2Item',
})
const emit = defineEmits<{
  click: [i: number]
}>()

const index = ref<number>(-1)
const parent = inject<ProvideObject>(TOKEN)
const vm = getCurrentInstance()!
const setIndex = (v: number) => index.value = v
onMounted(() => parent?.addStep(vm.uid, setIndex))
onBeforeUnmount(() => parent?.removeStep(vm.uid))
const handleClick = () => {
  emit('click', index.value)
  parent?.handleItemClick(index.value)
}
</script>

<template>
  <li class="f-steps2-item" :class="{ current: index <= (parent?.props.current ?? -1) }" @click="handleClick">
    <TailEnd v-if="index === 0" /><Tail v-else />
    <span class="f-steps2-item__content">
      <slot />
    </span>
    <Head />
  </li>
</template>

<style>
.f-steps2-item {
  display: flex;
  justify-content: start;
  align-items: center;
  color: #848691;
  flex: 1;
  overflow: hidden;
  --f-steps-color: #f5f6fa;

  &.current {
    color: #fff;
    --f-steps-color: var(--el-color-primary);
  }
  > svg {
    fill: var(--f-steps-color);
  }
  .f-steps2-item__content {
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: var(--f-steps-color);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
