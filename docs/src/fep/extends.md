# 扩展点

`@falconix/fep` 在 [element-plus](https://element-plus.org/zh-CN/component/overview) 之外额外提供的 功能/扩展

## 默认样式

增加了对字体和文本颜色的默认指定

```css
:root {
  font-family: getCssVar('font-family');
  color: var(--el-text-color-primary);
}
```

**_请不要在项目的任何代码中再次指定字体_**

## icon

请使用 `@falconix/icons-vue`。

提供了 `@element-plus/icons-vue` 原有图标和其他扩展图标

## drawer

- size?: 'small' | 'regular' | 'large'

  设定drawer的大小
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

- min-width: string | number

  `min-width` 除了 `element-plus` 当中原有属性的作用外

  当列被拖动时，尊重 `min-width` 的设置，列宽最小不能小于 `min-width` 的设定值

- #filtrPanel="{ column, filteredValue, handleConfirm, handleReset }"

  提供了在`el-table-column`重写`filter-panel`的插槽
  - column: {{'TableColumnCtx<DefaultRow>'}}

    列对象

  - filteredValue: WritableComputedRef<string[]>

    已选择的过滤值

  - handleConfirm: () => void

    确认回调

  - handleReset: () => void

    重置回调

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

## editable table

在 table 的基础上扩展了单元格编辑功能

### table

- edit-trigger: 'dblclick' | 'click'

  编辑触发方式

  默认值: dblclick

- before-enter-edit: (scope: EditScope\<T>) => boolean

  进入编辑前触发，返回 `false` 可以阻止进入编辑

- after-enter-edit: (scope: EditScope\<T>) => void

  进入编辑后触发

- before-exit-edit: (scope: EditScope\<T>) => boolean

  退出编辑前触发，返回 `false` 可以阻止退出编辑

- after-exit-edit: (scope: EditScope\<T>) => void

  退出编辑后触发

> EditScope

```ts
interface EditScope<T extends DefaultRow> {
  cell: Element
  row: T
  column: TableColumnCtx<T>
  rowIndex: number
  columnIndex: number
}
```

### table column

- #edit="{ row: any, column: TableColumnCtx\<T>, $index: number }"`

  单元格编辑模式插槽
  - row: any

    行数据对象

  - column: TableColumnCtx\<T>

    列对象

  - $index: number

    行索引

```vue
<template>
  <el-table edit-trigger="dblclick">
    <el-table-column prop="name" label="Name">
      <template #edit="{ row }">
        <el-input v-model="row.name" />
      </template>
    </el-table-column>
  </el-table>
</template>
```

## form item

在 `form item` 的基础上扩展了直接获取响应式数据的能力，使其可以脱离 `form` 组件直接使用

并且提供针对 `form item` 校验结果的 `@validate` 事件

- field-value: Object | () => Object

  响应式数据对象，或者返回响应式数据对象的函数

  当传入响应式数据对象的方式无法获取数据，或者丢失响应式时

  请尝试使用函数返回响应式数据对象的方式

- @validate: (prop: string, isValid: boolean, message: string) => void

  校验事件，在校验结果发生变化时触发
  - prop: string

    校验字段名

  - isValid: boolean

    校验结果

  - message: string

    校验消息

```vue
<script setup lang="ts">
const ref = ref('')
</script>

<template>
  <el-form-item
    :field-value="name"
    :rules="[{ required: true, message: 'required' }]"
    @validate="(prop, isValid, message) => void 0"
  >
    <el-input v-model="name" />
  </el-form-item>
</template>
```

## dropdown

扩展了 `referenceElementProps` 属性，用来控制当 `split-button` 时，左侧按钮的属性

`referenceElementProps` 会 merge `buttonProps` 的值

```vue
<script setup lang="ts">
const ref = ref('')
</script>

<template>
  <el-dropdown split-button :reference-element-props="{ disabled: true }">
    edit
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          add
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
```
