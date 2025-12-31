# @falconix/icons-vue

falconix icons svg

## 安装

```shell
pnpm i @falconix/icons-vue
```

## 使用

使用方式同 `@element-plus/icons-vue`

<demo vue="icons-vue.vue" />

## 添加图标

icon一共包含分三个部分：

- original: `@element-plus/icons-vue` 原有图标

- overrides: 存放在 `src/overrides` 文件夹

  覆盖`@element-plus/icons-vue`中原有的图标

- customs: 存放在 `src/customs` 文件夹

  不能与`@element-plus/icons-vue`图标重名

如果不需要覆盖`@element-plus/icons-vue`原有图标，请放到 `src/customs` 文件夹下

每个icon文件是一个`vue`组件

请注意 `svg` 源代码的适配性

```vue
// xxx.vue
<template>
  <!-- ↓ -->
  <svg>
    ......
  </svg>
  <!-- ↑ -->
</template>
```
