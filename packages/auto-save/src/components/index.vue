<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useAutoSave } from '../useAutoSave'

defineOptions({
  name: 'FAutoSave',
})

const props = withDefaults(defineProps<Props>(), {
  debounceMs: 500,
  deep: true,
  enabled: true,
  restoreOnMount: true,
})

const emit = defineEmits<{
  restored: [value: unknown]
  saved: [value: unknown]
  cleared: []
  error: [err: unknown]
}>()

export interface Props {
  storageKey: string
  debounceMs?: number
  deep?: boolean
  enabled?: boolean
  restoreOnMount?: boolean
}

const model = defineModel<unknown>({ default: undefined })

const { restore, clear, lastSavedAt, status, error } = useAutoSave(model, {
  storageKey: props.storageKey,
  debounceMs: props.debounceMs,
  deep: props.deep,
  enabled: props.enabled,
})

const statusText = computed(() => {
  if (!props.enabled) {
    return '已停用自动保存'
  }
  if (status.value === 'error') {
    return '草稿异常'
  }
  if (lastSavedAt.value) {
    return '已自动保存'
  }
  return '无草稿'
})

const lastSavedLabel = computed(() => {
  if (!lastSavedAt.value) {
    return ''
  }
  try {
    return new Date(lastSavedAt.value).toLocaleString()
  } catch {
    return String(lastSavedAt.value)
  }
})

const doRestore = () => {
  const r = restore()
  if (r.ok) {
    model.value = r.value
    emit('restored', r.value)
  } else if (status.value === 'error' && error.value != null) {
    emit('error', error.value)
  }
}

const doClear = () => {
  clear()
  if (status.value === 'error' && error.value != null) {
    emit('error', error.value)
  } else {
    emit('cleared')
  }
}

onMounted(() => {
  if (!props.restoreOnMount) {
    return
  }
  doRestore()
})

watch(lastSavedAt, (v) => {
  if (!v) {
    return
  }
  emit('saved', model.value)
})

watch([status, error], ([s, e]) => {
  if (s !== 'error') {
    return
  }
  if (e == null) {
    return
  }
  emit('error', e)
})
</script>

<template>
  <slot :status="status" :last-saved-at="lastSavedAt" :restore="doRestore" :clear="doClear">
    <div class="f-auto-save">
      <span class="f-auto-save__text">
        {{ statusText }}
        <template v-if="lastSavedLabel">
          · {{ lastSavedLabel }}
        </template>
      </span>
      <button class="f-auto-save__btn" type="button" @click="doRestore">
        恢复
      </button>
      <button class="f-auto-save__btn" type="button" @click="doClear">
        清除
      </button>
    </div>
  </slot>
</template>

<style>
.f-auto-save {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  line-height: 1;
  color: #606266;
}

.f-auto-save__text {
  user-select: none;
}

.f-auto-save__btn {
  appearance: none;
  border: 1px solid #dcdfe6;
  background: #fff;
  color: #606266;
  border-radius: 4px;
  padding: 2px 6px;
  cursor: pointer;
}

.f-auto-save__btn:hover {
  border-color: #c0c4cc;
}
</style>
