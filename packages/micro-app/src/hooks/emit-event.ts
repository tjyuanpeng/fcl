import { bus as WujieXBus } from 'wujie-x'

export const emitEvent = <T extends keyof $WujieXEventMap>(eventName: T, ...args: Parameters<$WujieXEventMap[T]>): void => {
  const bus = window?.$wujie?.bus ?? WujieXBus
  bus.$emit(eventName, ...args)
}
