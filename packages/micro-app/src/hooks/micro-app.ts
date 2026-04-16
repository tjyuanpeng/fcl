export * from './event'

export const isInMicroapp = (): boolean => Boolean(window.__POWERED_BY_WUJIE__)

export const isNewFramework = (): boolean => Boolean(window.$wujie?.props?.newFramework)

export const isFrameMode = (): boolean => window.location.pathname.startsWith('/_web')

export const getToken = (): string | null => localStorage.getItem('token')

export const getButtonPermissions = (): string | null => localStorage.getItem('buttonPermissions')

export const getMenuPermissions = (): string | null => localStorage.getItem('menuPermissions')

export const getCurrentEntityId = (): string | null => localStorage.getItem('CURR_ENTITY_ID')

export const getUserInfo = (): ReturnType<$WujieXProps['getUserInfo']> => window.$wujie?.props?.getUserInfo()

export const getFullPathFromUrl = (url: string): string => {
  const u = new URL(url, location.origin)
  return u.pathname + u.search + u.hash
}

export const pushMain = (url: string): void => {
  window.top?.history.pushState(window.history.state, '', getFullPathFromUrl(url))
  window.top?.dispatchEvent(new PopStateEvent('popstate', { state: window.top.history.state }))
}

export const replaceMain = (url: string): void => {
  window.top?.history.replaceState(window.history.state, '', getFullPathFromUrl(url))
  window.top?.dispatchEvent(new PopStateEvent('popstate', { state: window.top.history.state }))
}

export const openNewWindow = (url: string, { target = '_blank', frameMode = false }: { target?: string, frameMode?: boolean } = {}): void => {
  if (!isInMicroapp()) {
    window.open(url, target)
    return
  }

  if (frameMode) {
    const u = new URL(url, location.origin)
    u.protocol = location.protocol
    u.hostname = location.hostname
    u.port = location.port
    u.pathname = u.pathname.startsWith('/web') ? u.pathname.replace('/web', '/_web') : u.pathname
    u.searchParams.delete('token')
    window.top?.open(u.toString(), target)
    return
  }

  window.top?.open(url, target)
}

export const replacePathname = (url: string, from: string, to: string): string => {
  const u = new URL(url, location.origin)
  u.pathname = u.pathname.replace(from, to)
  return u.toString()
}

export const setHrefMain = (url: string): void => {
  window.top && (window.top.location.href = url)
}

export const isClient = (): boolean => false

export const getClientInfo = (): unknown => ({})

export const refreshRedDot = (): void => window.$wujie?.props?.refreshRedDot()
