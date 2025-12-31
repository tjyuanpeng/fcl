# @falconix/steps2

falconix steps2

## 安装

```shell
pnpm i @falconix/steps2
```

## 使用

<demo vue="steps2.vue" />

## 配置项

- active?: number

  当前步骤的序号

- items?: (string | VNode)[]

  步骤内容

- @itemClick: [i: number]

  点击步骤的回调函数

### FSteps2.Item

- @click: [i: number]

  点击步骤的回调函数
