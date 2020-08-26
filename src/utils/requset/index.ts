import requestjs from './request'

// 基础请求
function request<T>(url: string, params?: any, method = 'post', config?: object, autoShowError?: boolean): Promise<T> {
  return requestjs(url, params, method, config, autoShowError)
}

export default request
