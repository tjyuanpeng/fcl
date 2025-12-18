# @falconix/wujie-rpc

wujie 跨应用远程调用

## 安装

```shell
pnpm i @falconix/wujie-rpc
```

## 使用

无论是`rpcCall`，还是`rpcHook`，都会通过`vue`的生命周期函数自动挂载监听相关类型的事件

```ts
import { rpcCall, rpcHook, setRpcGlobalConfig } from '@falconix/wujie-rpc'
import { onMounted } from 'vue'

setRpcGlobalConfig({
  debug: true,
  namespace: 'web-app'
})

rpcHook('foo', () => ({ c: 3, d: 4 }))

onMounted(async () => {
  const params = { a: 1, b: 2 }
  const r = await rpcCall('foo', params)
  // {c: 3, d: 4}
})
```

## 方法

- rpcCall

  ```ts
  function rpcCall<T = any, R = any>(type: string, payload: T, options?: RpcOptions): Promise<R>
  ```

  - type: 类型名，全局唯一
  - payload: 需要传递的参数
  - options: 选项

- rpcHook

  ```ts
  function rpcHook<T = any, R = any>(type: string, callback: (payload: T) => R | Promise<R>, options?: RpcOptions): () => void
  ```

  - type: 类型名，全局唯一
  - callback: 回调函数。函数参数为通过`rpcCall`传递的参数，返回值为回传调用者的对象
  - options: 选项
  - 返回值：stop函数，停止关注相关的类型

    ```ts
    const stop = rpcHook('foo', () => ({ c: 3, d: 4 }))
    stop() // stop listening
    ```

- setRpcGlobalConfig

  ```ts
  interface GlobalConfig {
    debug?: boolean
    namespace?: string
  }
  ```

  - debug: 是否开启debuglog
  - namespace: log的命名空间
