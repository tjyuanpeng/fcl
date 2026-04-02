import { emitEvent } from './emit-event'
import { onEvent } from './on-event'

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

    pushMain: (fullPath: string): void => {
      window.top?.history.pushState(window.history.state, '', fullPath)
      window.top?.dispatchEvent(new PopStateEvent('popstate', { state: window.top.history.state }))
    },
    replaceMain: (fullPath: string): void => {
      window.top?.history.replaceState(window.history.state, '', fullPath)
      window.top?.dispatchEvent(new PopStateEvent('popstate', { state: window.top.history.state }))
    },
    replacePathname: (url: string, from: string, to: string): string => {
      const u = new URL(url, location.origin)
      u.pathname = u.pathname.replace(from, to)
      return u.toString()
    },
    openNewWindow: (url: string, { target = '_blank', frameMode = false }: { target?: string, frameMode?: boolean } = {}): void => {
      const u = new URL(url, location.origin)
      url = u.toString()
      if (frameMode && u.origin === location.origin) {
        url = microApp.replacePathname(url, '/web', '/_web')
      }
      window.top?.open(url, target)
    },
    setHrefMain: (url: string): void => {
      window.top && (window.top.location.href = url)
    },

    $emit: emitEvent,
    $on: onEvent,
  }

  return microApp
}
