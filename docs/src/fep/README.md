# @falconix/fep

falconix 基础组件库

repo: [@falconix/fep](http://10.168.2.105:8888/soft_group/yingmai/fe_group/fep)

## 安装

```shell
pnpm i @falconix/fep
```

## 配置

```typescript
// vite.config.ts
import { FepResolver } from '@falconix/fep-resolver'
import vue from '@vitejs/plugin-vue'

export default defineConfig(() => {
  const env = checkAndLoadEnv()
  return {
    plugins: [
      AutoImport({
        resolvers: [FepResolver()],
      }),
      Components({
        resolvers: [FepResolver()],
      }),
      vue(),
    ],
  }
})
```

## 注意事项

使用`@falconix/fep-resolver`之后，`@falconix/fep`会按需导入，所以不需要再完整导入fep

## 使用

基于 [element-plus](https://element-plus.org/zh-CN/component/overview) 进行扩展，基本使用方法请参考 `element-plus` 文档

```vue
<script setup lang="ts">
function foo() {
  ElMessageBox.alert('I`m a FEP alert.')
}
</script>

<template>
  <el-button @click="foo">
    I`m a FEP Button.
  </el-button>
</template>
```
