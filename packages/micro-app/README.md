# @falconix/micro-app

falconix 微前端应用

## 安装

```shell
pnpm i @falconix/micro-app
```

## 类型定义

### 全局变量补充

为 `wujie` / `wujie-x` 的全局变量补充类型定义

### 额外类型

提供两个额外的类型用于扩展

- $WujieXProps

  用于描述 wujie-x 应用的 props 类型定义

  ```ts
  interface $WujieXProps {
    username: string
  }
  ```

- $WujieXEventMap

  用于描述 事件 以及 对应的回调函数 的类型

  ```ts
  interface $WujieXEventMap {
    'event-name': (data: { key: string }) => void
  }
  ```

## Hooks

### on-micro-app-activated

用于监听微应用激活事件

```ts
import { onMicroAppActivated } from '@falconix/micro-app'

onMicroAppActivated(() => {
  console.log('Micro app was activated.')
})

// Option: immediate
onMicroAppActivated(() => {}, {
  immediate: true, // boolean | 'onMounted' | 'onActivated'
})
```

### use-micro-app-props

用于获取传递给微应用的 props

```ts
import { useMicroAppProps } from '@falconix/micro-app'

const props = useMicroAppProps()
console.log(props.username)
```

## 方法

微应用使用相关的方法

```ts
import { microApp } from '@falconix/micro-app'

// 或者直接导出函数直接使用
// import { isInMicroapp, $emit, $on } from '@falconix/micro-app'

microApp.isInMicroapp() // 是否在微应用中运行
microApp.isNewFramework() // 是否在新框架中运行
microApp.isFrameMode() // 是否在 frame 模式中运行

microApp.isClient() // 是否在客户端运行
microApp.getClientInfo() // 获取客户端信息

microApp.getToken() // 获取 token
microApp.getButtonPermissions() // 获取 按钮权限
microApp.getMenuPermissions() // 获取 菜单权限
microApp.getCurrentEntityId() // 获取当前实体ID

microApp.pushMain('/web/test?key=value') // 主应用路由 push
microApp.replaceMain('/web/test?key=value') // 主应用路由 replace
microApp.openNewWindow('/web/test?key=value', { frameMode: true }) // 在新窗口，使用frame模式，使用主框架域名补全URL，打开链接
microApp.openNewWindow('https://www.baidu.com/') // 在新窗口，打开链接
microApp.setHrefMain('https://www.baidu.com/') // 设置主应用URL，触发页面刷新

microApp.getUserInfo() // 获取用户信息
microApp.refreshRedDot() // 刷新红点

microApp.$emit('event-name', { key: 'value', }) // 触发事件
const stop = microApp.$on('event-name', (data) => {}) // 监听事件。会结合 vue3 的生命周期函数，自动在组件相关生命周期中，监听/取消 事件
microApp.$off('event-name', (data) => {}) // 取消监听事件
```
