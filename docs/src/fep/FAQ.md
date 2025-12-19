# FAQ

## 一定要使用 @falconix/fep-resolver 吗？

建议是的，因为省去了手动引用相关组件的麻烦

同时实现了按需导入，避免打包产物过大的问题

同时建议搭配 `unplugin-auto-import` 一同使用，自动引入相关组件的全局函数，比如 `ElMessageBox`

如果不使用 `fep-resolver`，在手动引入相关ts的同时，需同时引入相关组件的样式，否则会导致样式错乱

## 我可以在 vue template 中使用组件的全局函数吗

不可以

请添加额外的函数，在script内调用全局函数

```vue
<script>
const clear = () => ElMessage.closeAll()
</script>

<template>
  <!-- YES -->
  <el-button style="margin-left: auto" @click="clear">
    clear all
  </el-button>

  <!-- NO -->
  <el-button style="margin-left: auto" @click="ElMessage.closeAll()">
    clear all
  </el-button>
</template>
```
