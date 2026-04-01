import type { bus } from 'wujie-x'

declare global {

  interface $WujieXProps {
  }

  interface $WujieXEventMap {
    'WujieXCustomEvent': any

    'loginExpired': () => void
    'reloadTodoNum': () => void
    'reloadMainMenu': () => void
    'tobBarSearchShow': () => void

    'drawerOpen': (data: any) => void
    'shadowBoxOverlayClose': () => void
    'showShadowBoxOverlay': (data: { url: string, props: any }) => void

    'upload-complete-change': (data: any) => void
  }

  interface Window {
    __POWERED_BY_WUJIE__: boolean
    __WUJIE_PUBLIC_PATH__: string
    __WUJIE_RAW_DOCUMENT_QUERY_SELECTOR__: typeof Document.prototype.querySelector
    __WUJIE_RAW_DOCUMENT_QUERY_SELECTOR_ALL__: typeof Document.prototype.querySelectorAll
    __WUJIE_RAW_WINDOW__: Window
    __WUJIE: unknown
    __WUJIE_MOUNT: () => void
    __WUJIE_UNMOUNT: () => void | Promise<void>
    $wujie: {
      bus: typeof bus
      shadowRoot?: ShadowRoot
      props?: $WujieXProps
      location?: object
    }
  }
}

export {}
