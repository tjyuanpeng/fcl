# 扩展点

`@falconix/fep` 在 [element-plus](https://element-plus.org/zh-CN/component/overview) 之外额外提供的 功能/扩展

## 默认样式指定

`fep` 相比 `element-plus`，增加了对字体和文本颜色的默认指定

**_请不要在项目中任何代码中再次指定字体_**

```css
:root {
  font-family: getCssVar('font-family');
  color: var(--el-text-color-primary);
}
```

## icon

请使用 `@falconix/icons-vue`。提供了 `@element-plus/icons-vue` 原有图标和其他扩展图标

## drawer

size: string 设定drawer的大小

可选项：

- small: 335px
- regular: 420px
- large: 950px

```vue
<template>
  <el-drawer size="small">
    <span>Hi, there!</span>
  </el-drawer>
</template>
```

## table

min-width: string | number `min-width` 除了原有属性的作用外，当列被拖动时，尊重 `min-width` 的设置，列宽最小不能小于 `min-width` 的设定值

#filtrPanel: slot 提供了在`el-table-column`重写`filter-panel`的实现。scope:

- column 列对象
- filteredValue: WritableComputedRef<string[]> 已选择过滤值
- handleConfirm: () => void 确认回调
- handleReset: () => void 重置回调

```vue
<template>
  <el-table-column>
    <template #filter-panel="{ column, filteredValue, handleConfirm, handleReset }">
      {{ column }} {{ filteredValue }}
      <el-button @click="handleReset">
        reset
      </el-button>
      <el-button @click="handleConfirm">
        confirm
      </el-button>
    </template>
  </el-table-column>
</template>
```

## ElMessageBox

fep: boolean 是否使用fep风格

为 `ElMessageBox` 相关函数提供一个可以手动关闭`fep`风格的选项

默认值: true

```ts
function confirm() {
  ElMessageBox.confirm(
    'content',
    'title',
    {
      type: 'warning',
      fep: true,
    },
  )
}
```
