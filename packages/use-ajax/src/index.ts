import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { AxiosError } from 'axios'

declare module 'axios' {

  interface AxiosError<T> {
    result: T
    msg: string
  }

  interface AxiosResponse<T> {
    error?: AxiosError
    result: T
    msg: string
  }

  interface AxiosRequestConfig {
    checkBizError?: ((response: AxiosResponse) => boolean) | false
    noErrorThrown?: boolean
    getMessage?: (response: AxiosResponse) => string
    showMessageTip?: ((msg: string) => void) | false
    checkAuthError?: ((error: any) => boolean) | false
    gotoLogin?: () => void
  }
}

const instance = axios.create({
  withCredentials: true,
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})

instance.interceptors.response.use((response) => {
  if (response.config.checkBizError && response.config.checkBizError(response)) {
    const axiosError = new AxiosError(
      response.config.getMessage!(response),
      'BUSINESS_ERROR',
      response.config,
      response.request,
      response,
    )
    return Promise.reject(axiosError)
  }
  return response
})

instance.interceptors.response.use(null, (error: AxiosError) => {
  if (error.config?.checkAuthError && error.config.checkAuthError(error)) {
    error.config.gotoLogin?.()
    return new Promise(() => {})
  }
  return Promise.reject(error)
})

instance.interceptors.response.use(null, (error: AxiosError) => {
  if (error?.config?.noErrorThrown) {
    return Promise.resolve({
      error,
      data: error?.response?.data,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      config: error.config,
      request: error.request,
    })
  }
  return Promise.reject(error)
})

instance.interceptors.response.use(
  (response) => {
    return Promise.resolve({
      ...response,
      result: response.data.rows ?? response.data.data,
      msg: response.config.getMessage!(response),
    })
  },
  (error: AxiosError<any>) => {
    let msg = '网络异常，请稍后再试'
    if (error.response && error.response.status !== 200) {
      msg = error.response.statusText
    } else if (error.response?.data && error.response.data.code !== 200) {
      msg = error.config?.getMessage!(error.response) ?? '网络异常，请稍后再试'
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      ...error,
      result: error.response?.data?.rows ?? error.response?.data?.data,
      msg,
    })
  },
)

instance.interceptors.response.use(null, (error: AxiosError) => {
  if (error?.config?.showMessageTip) {
    error.config.showMessageTip(error.msg)
  }
  return Promise.reject(error)
})

let globalConfig: AxiosRequestConfig = {
  checkBizError: response => response.data.code !== 200,
  noErrorThrown: false,
  getMessage: response => response.data.message ?? response.data.msg ?? '网络异常，请稍后再试',
  showMessageTip: msg => console.error(msg),
  checkAuthError: error => error?.response?.data?.code === 403,
  gotoLogin: () => {
    localStorage.removeItem('token')
    location.href = '/login'
  },
}

export function setUseAjaxGlobalConfig(config: AxiosRequestConfig): void {
  globalConfig = {
    ...globalConfig,
    ...config,
  }
}

export function useAjax<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
  return instance.request<T, R, D>({
    ...globalConfig,
    ...config,
  })
}

useAjax.get = useAjax
useAjax.post = (config => useAjax({ ...config, method: 'post' })) as typeof useAjax
useAjax.put = (config => useAjax({ ...config, method: 'put' })) as typeof useAjax
useAjax.delete = (config => useAjax({ ...config, method: 'delete' })) as typeof useAjax
