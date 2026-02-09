import type { ComputedRef, Ref, ShallowRef } from 'vue'
import { onScopeDispose, ref, shallowRef, watch } from 'vue'

export type AutoSaveStatus = 'idle' | 'saved' | 'error'

export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export interface UseAutoSaveOptions<T> {
  storageKey: string
  debounceMs?: number
  deep?: boolean
  enabled?: boolean
  serializer?: (v: T) => string
  deserializer?: (raw: string) => T
  storage?: StorageLike
}

export interface UseAutoSaveReturn<T> {
  restore: () => { ok: true, value: T } | { ok: false }
  clear: () => void
  lastSavedAt: Ref<number | null>
  status: Ref<AutoSaveStatus>
  error: ShallowRef<unknown | null>
}

function getDefaultStorage(): StorageLike | undefined {
  try {
    const anyGlobal = globalThis as any
    const storage = anyGlobal?.localStorage as Storage | undefined
    if (!storage) {
      return
    }
    storage.getItem('__fcl_auto_save_probe__')
    return storage
  } catch {

  }
}

export function useAutoSave<T>(
  valueRef: Ref<T> | ComputedRef<T>,
  options: UseAutoSaveOptions<T>,
): UseAutoSaveReturn<T> {
  const {
    storageKey,
    debounceMs = 500,
    deep = true,
    enabled = true,
    serializer = JSON.stringify as (v: T) => string,
    deserializer = JSON.parse as (raw: string) => T,
    storage = getDefaultStorage(),
  } = options

  const lastSavedAt = ref<number | null>(null)
  const status = ref<AutoSaveStatus>('idle')
  const error = shallowRef<unknown | null>(null)

  let timeout: ReturnType<typeof setTimeout> | undefined

  const setError = (err: unknown): void => {
    status.value = 'error'
    error.value = err
  }

  const setSaved = (): void => {
    status.value = 'saved'
    error.value = null
    lastSavedAt.value = Date.now()
  }

  const clearTimeoutIfNeeded = (): void => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = undefined
  }

  const scheduleSave = (value: T): void => {
    if (!enabled) {
      return
    }
    if (!storage) {
      return
    }
    clearTimeoutIfNeeded()
    timeout = setTimeout(() => {
      try {
        const raw = serializer(value)
        storage.setItem(storageKey, raw)
        setSaved()
      } catch (err) {
        setError(err)
      }
    }, Math.max(0, debounceMs))
  }

  if (enabled && storage) {
    watch(valueRef, value => scheduleSave(value), {
      deep,
      flush: 'post',
    })
  }

  const restore: UseAutoSaveReturn<T>['restore'] = () => {
    if (!enabled) {
      return { ok: false }
    }
    if (!storage) {
      return { ok: false }
    }

    let raw: string | null
    try {
      raw = storage.getItem(storageKey)
    } catch (err) {
      setError(err)
      return { ok: false }
    }

    if (raw == null) {
      return { ok: false }
    }

    try {
      const value = deserializer(raw)
      error.value = null
      if (status.value === 'error') {
        status.value = 'idle'
      }
      return { ok: true, value }
    } catch (err) {
      setError(err)
      try {
        storage.removeItem(storageKey)
      } catch { }
      return { ok: false }
    }
  }

  const clear: UseAutoSaveReturn<T>['clear'] = () => {
    if (!storage) {
      return
    }
    clearTimeoutIfNeeded()
    try {
      storage.removeItem(storageKey)
      lastSavedAt.value = null
      status.value = 'idle'
      error.value = null
    } catch (err) {
      setError(err)
    }
  }

  onScopeDispose(() => {
    clearTimeoutIfNeeded()
  })

  return {
    restore,
    clear,
    lastSavedAt,
    status,
    error,
  }
}
