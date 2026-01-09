# @falconix/icon

一个基于 Vue3 + TypeScript 的 Iconfont 图标组件，支持自定义大小、颜色和类名，方便在项目中统一管理和使用 Iconfont 图标。

## 安装

```shell
pnpm install @falconix/icon
```

## 引入

在 main.ts 中全局注册组件， 并引入样式文件：

```ts
import Icon from '@falconix/icon'
import { createApp } from 'vue'
import App from './App.vue'
import '@falconix/icon/dist/assets/iconfont/iconfont.css'

const app = createApp(App)
app.use(Icon)
app.mount('#app')
```

## 用法

### 基础用法

```vue
<template>
  <Icon name="icon-user" />
</template>
```

### 自定义大小和颜色

```vue
<template>
  <Icon
    name="icon-settings"
    size="24"
    color="#409EFF"
  />
  <!-- 也支持数字类型的大小 -->
  <Icon
    name="icon-search"
    size="24"
    color="red"
  />
</template>
```

### 自定义类名和标题

```vue
<template>
  <Icon
    name="icon-home"
    custom-class="mr-2"
    title="首页"
  />
</template>
```

## 属性

| 属性名      | 类型             | 说明                                                      | 默认值 |
| ----------- | ---------------- | --------------------------------------------------------- | ------ |
| name        | string           | 图标名称（必填，对应 Iconfont 中的图标类名）              | -      |
| size        | number \| string | 图标大小，支持数字（单位 px）或字符串（如 '24px'、'2em'） | -      |
| color       | string           | 图标颜色，支持颜色值（如 '#fff'、'red'）                  | -      |
| title       | string           | 图标标题，鼠标悬停时显示                                  | -      |
| customClass | string           | 自定义类名，用于添加额外样式                              | -      |

## 注意事项

1.  图标名称 `name` 对应 Iconfont 中的图标类名。例如，Iconfont 中的图标类名为 `icon-user`，则 `name` 应为 `icon-user`。

2.  如果需要修改图标的默认样式，可以通过自定义类名 `customClass` 或全局样式来实现。

## 示例

```vue
<template>
  <div class="icon-example">
    <Icon
      name="icon-user"
      size="20"
      color="#333"
      title="用户"
      custom-class="icon-margin"
    />
    <Icon
      name="icon-setting"
      size="24"
      color="#409EFF"
      custom-class="icon-margin"
    />
    <Icon
      name="icon-home"
      size="28"
      color="green"
    />
  </div>
</template>

<style>
.icon-margin {
  margin-right: 10px;
}
</style>
```
