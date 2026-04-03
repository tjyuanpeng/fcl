declare global {

  interface $WujieXProps {
    newFramework: boolean
    getUserInfo: () => {
      nickName: string
      userId: number
      avatarUrl: string
      userName: string
      position: string
      deptName: string
      defaultPosition: string
      userDeptOptions: {
        label: string
        value: number
        default: boolean
      }[]
      userDeptIds: number[]
      deptIds: number[]
      defaultDeptId: number
      defaultDeptName: string
      defaultUserDeptId: number
    } | undefined
    refreshRedDot: () => void
  }

  interface $WujieXEventMap {
    // wujie-x
    '@wujie-x/app-activated': () => void
    '@wujie-x/props-change': () => void
    '@wujie-x-vue/update-props': (props: $WujieXProps) => void

    // auth
    'loginExpired': () => void

    // drawer
    'drawerOpen': (data: any) => void
    'showShadowBoxOverlay': (data: { url: string, props: any }) => void
    'shadowBoxOverlayClose': () => void

    // red dot
    'reloadMainMenu': () => void
    'reloadTodoNum': () => void

    // home page
    'layoutChange': () => void

    // top bar serach input
    'initTobBarSearchShow': () => void
    'tobBarSearchShow': () => void

    // upload center
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
      bus: {
        $emit: <T extends keyof $WujieXEventMap>(eventName: T, ...args: Parameters<$WujieXEventMap[T]>) => void
        $on: <T extends keyof $WujieXEventMap>(eventName: T, callback: $WujieXEventMap[T]) => void
        $off: <T extends keyof $WujieXEventMap>(eventName: T, callback: $WujieXEventMap[T]) => void
      }
      shadowRoot?: ShadowRoot
      props?: $WujieXProps
      location?: object
    }
  }
}

export {}
