# @falconix/use-ajax

基于 axios 的 http 请求客户端

## 安装

```shell
pnpm i @falconix/use-ajax
```

## 使用

基于 [axios](https://axios-http.com/zh/docs/intro) 进行扩展

基本使用方法请参考 `axios` 文档

```ts
import { setUseAjaxGlobalConfig, useAjax } from '@falconix/use-ajax'

setUseAjaxGlobalConfig({
  baseURL: '/api',
  showMessageTip: msg => ElMessage({ message: msg, type: 'error' }),
})
async function test() {
  const { result } = await useAjax.post({
    url: '/foo/bar',
  })
}
test()
```

<demo vue="use-ajax.vue" />

## 配置项

`use-ajax` 扩展了 `axios` 配置项

```ts
declare module 'axios' {
  interface AxiosRequestConfig {
    checkBizError?: ((response: AxiosResponse) => boolean) | false
    noErrorThrown?: boolean
    getMessage?: (response: AxiosResponse) => string
    showMessageTip?: ((msg: string) => void) | false
    checkAuthError?: ((error: any) => boolean) | false
    gotoLogin?: () => void | false
  }
  interface AxiosResponse<T> {
    error?: AxiosError
    result: T
    msg: string
  }
}

// default values:
const globalConfig: AxiosRequestConfig = {
  checkBizError: response => response.data.code !== 200,
  noErrorThrown: false,
  getMessage: response => response.data.message ?? response.data.msg ?? '网络异常，请稍后再试',
  showMessageTip: msg => ElMessage({ message: msg, type: 'error' }),
  checkAuthError: error => error?.response?.data?.code === 403,
  gotoLogin: () => {
    localStorage.removeItem('token')
    location.href = '/login'
  },
}
```

- checkBizError: 检测业务错误

  如果传递`false`，则禁止检测业务错误；可以传入函数覆盖默认逻辑

- noErrorThrown: 禁止抛出异常

  如果传递`true`，遇到错误后不再抛出异常，而是在返回值增加`error`属性，表明是否有错误发生

- getMessage: 设置如何解析消息

- showMessageTip: 如何显示消息提示

  如果传递`false`，则禁止显示消息提示；可以传入函数覆盖默认逻辑

- checkAuthError: 是否检测认证错误消息

  如果传递`false`，则禁止检测认证错误；可以传入函数覆盖默认逻辑

- gotoLogin: 检测到认证错误消息后的行为

  如果传递`false`，则禁止默认逻辑；可以传入函数覆盖默认逻辑

## 方法

### useAjax

```ts
function useAjax<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>
```

### useAjax.get、useAjax.post、useAjax.put、useAjax.delete

作为`useAjax`的快捷函数存在，对`method`属性分别进行设置

```ts
useAjax.post({ url: '/foo/bar' })
// 等价于
useAjax({ url: '/foo/bar', method: 'post' })
```

### setUseAjaxGlobalConfig

设置全局配置项

```ts
function setUseAjaxGlobalConfig(config: AxiosRequestConfig): void
```
