<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  size?: number | string
  color?: string
  title?: string
  customClass?: string
}

const props = defineProps<Props>()

const style = computed(() => {
  const styles: Record<string, string | number> = {}
  if (props.size) {
    styles.fontSize = typeof props.size === 'number' ? `${props.size}px` : props.size
  }
  if (props.color) {
    styles.color = props.color
  }
  return styles
})
</script>

<template>
  <i
    class="iconfont" :class="[props.name, customClass]"
    :style="style"
    :title="title"
  />
</template>
