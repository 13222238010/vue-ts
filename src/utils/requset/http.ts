import axios from 'axios'
import { Message } from 'element-ui'
import { getCommonHeader } from '../storage'
import { CONTENT_TYPE_BLOB, downloadBlob } from '../download'
import { CODE, HTTP_CODE } from './code'

/**
 * 获取响应类型
 * @param {String} contentType 响应类型 eg: application/json; charset=utf-8 或者 application/json 或者 application/json; 或者 charset=utf-8;application/json
 */
function getContentType(contentType: string): string {
  if (contentType) {
    let matchResult = contentType.match(/((application|audio|video|text|image)\/[\w\d.-]*)(?:;?)/)
    if (matchResult) {
      // eslint-disable-next-line
      let [full, result] = matchResult
      return result
    } else {
      return ''
    }
  } else {
    return ''
  }
}

/**
 * 设置消息头
 * @param {*} config config
 */
function setHeaders(config: any) {
  config.headers = Object.assign(
    { 'Cache-Control': 'no-cache', Pragma: 'no-cache' }, // ie浏览器会缓存请求, 禁止缓存
    config.headers,
    getCommonHeader(),
  )
}

// 创建axios实例
let service: any = {}
service = axios.create({
  baseURL: '/api', // api的base_url
  timeout: 50000, // 请求超时时间
})

// request拦截器 axios的一些配置
service.interceptors.request.use(
  (config: any) => setHeaders(config),
  (error: any) => {
    // Do something with request error
    console.error('error:', error) // for debug
    Promise.reject(error)
  },
)

// respone拦截器 axios的一些配置
service.interceptors.response.use(
  (response: any) => {
    let data = response.data
    const headers = response.headers
    const contentType = getContentType(headers['content-type'])
    // 导出文件，返回的是文件流
    if (headers['content-type'] && CONTENT_TYPE_BLOB.indexOf(contentType) > -1) {
      // eslint-disable-next-line
      let [contentDisposition, fileName] = headers['content-disposition'].match(/filename\*=UTF-8''(.*)$/)
      downloadBlob(contentType, data, fileName && window.decodeURIComponent(fileName))
      return response
    } else {
      if (data.code === CODE.SUCCESS) {
        // 接口成功code固定为"0000""
        return data
      } else {
        return Promise.reject(data)
      }
    }
  },
  (error: any) => {
    console.error('error:' + error) // for debug
    return Promise.reject(error)
  },
)
// 错误码处理

function errorHandle(error: any) {
  if (!error || !error.response) {
    return false
  }
  Message.error(`${HTTP_CODE[error.response.status + '']}` || '未知错误')
}

export default service
