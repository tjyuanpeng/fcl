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
