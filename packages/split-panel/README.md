# @falconix/split-panel

falconix split panel

## 安装

```shell
pnpm i @falconix/split-panel
```

## 使用

<demo vue="split-panel.vue" />

## 配置项

- collapsed?: boolean / v-model

  是否折叠

- subPosition?: 'top' | 'right' | 'bottom' | 'left'

  子内容位置

- dividerPosition?: 'middle' | 'edge'

  分隔线的相对位置

- splitterOffset?: CSSProperties['left'] | CSSProperties['top']

  分隔器的相对偏移量

- noLine?: boolean

  是否显示分隔线

- @change: [collapsed: boolean]

  折叠变化时的事件

- #sub

  子内容插槽

- #splitter="{ flip, vertical }"

  分割器插槽
  - flip: boolean

    是否翻转

  - vertical

    是否垂直显示
