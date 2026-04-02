import { emitEvent } from './emit-event'
import { onEvent } from './on-event'

const replacePathname = (fullPath: string, from: string, to: string): string => {
  const url = new URL(fullPath, location.origin)
  url.pathname = url.pathname.replace(from, to)
  return url.pathname + url.search + url.hash
}

// eslint-disable-next-line ts/explicit-function-return-type
export const useMicroApp = () => {
  const microApp = {
    isInMicroapp: () => Boolean(window.__POWERED_BY_WUJIE__),
    isNewFramework: () => Boolean((window.$wujie?.props as any)?.newFramework),
    isFrameMode: () => window.location.pathname.startsWith('/_web'),

    isClient: () => false,
    getClientInfo: () => ({}),

    getToken: () => localStorage.getItem('token'),
    getButtonPermissions: () => localStorage.getItem('buttonPermissions'),
    getMenuPermissions: () => localStorage.getItem('menuPermissions'),
    getCurrentEntityId: () => localStorage.getItem('CURR_ENTITY_ID'),

    openNewWindow: (url: string, { target = '_blank', frameMode = false }: { target?: string, frameMode?: boolean } = {}): void => {
      if (frameMode && new URL(url, location.origin).origin === location.origin) {
        url = replacePathname(url, '/web', '/_web')
      }
      window.top?.open(url, target)
    },
    pushMain: (fullPath: string): void => {
      window.top?.history.pushState(window.history.state, '', fullPath)
      window.top?.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }))
    },
    replaceMain: (fullPath: string): void => {
      window.top?.history.replaceState(window.history.state, '', fullPath)
      window.top?.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }))
    },
    $emit: emitEvent,
    $on: onEvent,
  }

  return microApp
}
