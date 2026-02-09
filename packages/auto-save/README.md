# @falconix/auto-save

本地草稿自动保存（localStorage）工具函数与组件。

## 安装

```shell
pnpm i @falconix/auto-save
```

## 使用

### 组件

```vue
<script setup lang="ts">
const form = ref({ title: '', desc: '' })
</script>

<template>
  <FAutoSave v-model="form" storage-key="fcl:auto-save:demo" />
</template>
```

### 工具函数

```ts
import { useAutoSave } from '@falconix/auto-save'

const form = ref({ title: '', desc: '' })
const { restore, clear, status, lastSavedAt } = useAutoSave(form, {
  storageKey: 'fcl:auto-save:demo',
})
```

<demo vue="auto-save.vue" />
