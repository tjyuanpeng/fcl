export * from './event'

export const isInMicroapp = (): boolean => Boolean(window.__POWERED_BY_WUJIE__)

export const isNewFramework = (): boolean => Boolean(window.$wujie?.props?.newFramework)

export const isFrameMode = (): boolean => window.location.pathname.startsWith('/_web')

export const isClient = (): boolean => false

export const getClientInfo = (): unknown => ({})

export const getToken = (): string | null => localStorage.getItem('token')

export const getButtonPermissions = (): string | null => localStorage.getItem('buttonPermissions')

export const getMenuPermissions = (): string | null => localStorage.getItem('menuPermissions')

export const getCurrentEntityId = (): string | null => localStorage.getItem('CURR_ENTITY_ID')

export const pushMain = (fullPath: string): void => {
  window.top?.history.pushState(window.history.state, '', fullPath)
  window.top?.dispatchEvent(new PopStateEvent('popstate', { state: window.top.history.state }))
}

export const replaceMain = (fullPath: string): void => {
  window.top?.history.replaceState(window.history.state, '', fullPath)
  window.top?.dispatchEvent(new PopStateEvent('popstate', { state: window.top.history.state }))
}

export const getFullPathFromUrl = (url: string): string => {
  const u = new URL(url, location.origin)
  return u.pathname + u.search + u.hash
}

export const replacePathname = (url: string, from: string, to: string): string => {
  const u = new URL(url, location.origin)
  u.pathname = u.pathname.replace(from, to)
  return u.toString()
}

export const openNewWindow = (url: string, { target = '_blank', frameMode = false }: { target?: string, frameMode?: boolean } = {}): void => {
  const u = new URL(url, location.origin)
  url = u.toString()
  if (frameMode && u.origin === location.origin) {
    url = replacePathname(url, '/web', '/_web')
  }
  window.top?.open(url, target)
}

export const setHrefMain = (url: string): void => {
  window.top && (window.top.location.href = url)
}

export const getUserInfo = (): ReturnType<$WujieXProps['getUserInfo']> => window.$wujie?.props?.getUserInfo()

export const refreshRedDot = (): void => window.$wujie?.props?.refreshRedDot()
