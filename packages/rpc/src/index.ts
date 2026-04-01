import { getCurrentInstance, nextTick, onActivated, onDeactivated, onMounted, onUnmounted } from 'vue'
import { bus as WujieXBus } from 'wujie-x'

const bus = (window as any)?.$wujie?.bus ?? WujieXBus

export interface RpcEvent<T> {
  type: string
  eventId: string
  payload: T
}

export interface RpcOptions {
  signal?: AbortSignal
  hookOnLifecycles?: boolean
}

export interface GlobalConfig {
  debug?: boolean
  namespace?: string
}

let globalConfig: GlobalConfig = {
  debug: false,
  namespace: undefined,
}

export function setRpcGlobalConfig(config: GlobalConfig): void {
  globalConfig = {
    ...globalConfig,
    ...config,
  }
}

function log(...args: any[]): void {
  if (globalConfig.debug) {
    console.debug('[wujie-rpc]:', `[${globalConfig.namespace ?? ''}]`, ...args)
  }
}

const callEventName = (type: string): string => `@rpc.call:${type}`
const callbackEventName = (type: string, eventId: string): string => `@rpc.callback:${type}-${eventId}}`

export function rpcCall<T = any, R = any>(type: string, payload: T, options?: RpcOptions): Promise<R> {
  return new Promise<R>((resolve) => {
    let completed = false
    let attached = false

    const eventId = Math.random().toString(36).slice(2)
    nextTick(() => {
      log('rpc.call', 'send', type, eventId, payload)
      bus.$emit(callEventName(type), { type, eventId, payload } as RpcEvent<T>)
    })

    function routing(e: RpcEvent<R>): void {
      log('rpc.call', 'callback.received', e.type, e.eventId, e.payload)
      completed = true
      off()
      resolve(e.payload)
    }
    function on(): void {
      if (!attached && !completed) {
        bus.$on(callbackEventName(type, eventId), routing)
        attached = true
      }
    }
    function off(): void {
      if (attached) {
        bus.$off(callbackEventName(type, eventId), routing)
        attached = false
      }
    }
    function stop(): void {
      completed = true
      off()
    }

    log('rpc.call', 'direct.on', type, eventId)
    on()

    if (getCurrentInstance() && (options?.hookOnLifecycles ?? true)) {
      onMounted(() => {
        log('rpc.call', 'onMounted.on', type, eventId)
        on()
      })
      onActivated(() => {
        log('rpc.call', 'onActivated.on', type, eventId)
        on()
      })
      onUnmounted(() => {
        log('rpc.call', 'onUnmounted.off', type, eventId)
        off()
      })
      onDeactivated(() => {
        log('rpc.call', 'onDeactivated.off', type, eventId)
        off()
      })
    }
    options?.signal?.addEventListener('abort', () => {
      log('rpc.call', 'signal.abort', type, eventId)
      stop()
    })
  })
}

export function rpcHook<T = any, R = any>(type: string, callback: (payload: T) => R | Promise<R>, options?: RpcOptions): () => void {
  let completed = false
  let attached = false

  async function routing(e: RpcEvent<T>): Promise<void> {
    const { type, eventId, payload } = e
    log('rpc.hook', 'received', type, eventId, payload)
    const result = await callback(payload)

    nextTick(() => {
      log('rpc.hook', 'callback.send', type, eventId, result)
      bus.$emit(callbackEventName(type, eventId), { type, eventId, payload: result } as RpcEvent<R>)
    })
  }
  function on(): void {
    if (!attached && !completed) {
      bus.$on(callEventName(type), routing)
      attached = true
    }
  }
  function off(): void {
    if (attached) {
      bus.$off(callEventName(type), routing)
      attached = false
    }
  }
  function stop(): void {
    completed = true
    off()
  }

  log('rpc.hook', 'direct.on', type)
  on()

  if (getCurrentInstance() && (options?.hookOnLifecycles ?? true)) {
    onMounted(() => {
      log('rpc.hook', 'onMounted.on', type)
      on()
    })
    onActivated(() => {
      log('rpc.hook', 'onActivated.on', type)
      on()
    })
    onUnmounted(() => {
      log('rpc.hook', 'onUnmounted.off', type)
      off()
    })
    onDeactivated(() => {
      log('rpc.hook', 'onDeactivated.off', type)
      off()
    })
  }
  options?.signal?.addEventListener('abort', () => {
    log('rpc.hook', 'signal.abort', type)
    stop()
  })

  return stop
}
