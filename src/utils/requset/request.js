import http from './http'
import { ApiPrefix } from '../config'
import { Message, Modal } from 'element-ui'
import CODE from './code'
import { initLogin } from '../storage'

const throttle = (fn, time) => {
  let flag = true
  return (...args) => {
    if (flag) {
      fn(...args)
      flag = false
      setTimeout(() => {
        flag = true
      }, time)
    }
  }
}

/**
 * 处理登录状态失效，一段时间内只能弹一次提示，防止多次提示
 */
export const handleTokenFail = throttle(() => {
  Modal.warning({
    title: '您的登录已失效，请重新登录',
    onOk: () => {
      initLogin()
    },
    okText: '确定',
    className: 'modal-no-login',
  })
}, 3000)

/**
 * 普通错误弹窗
 */
export const handleCommonError = throttle(err => {
  if (err.code === CODE.ACCOUNT_DELETE_PERMISSION) {
    // 账号删除的报错使用warning, 其他使用error
    Message.warning(err.message)
  } else {
    Message.error(err.message && typeof err.message === 'string' ? err.message : '未知错误')
  }
}, 2000)

/**
 *
 * @param {*} url
 * @param {*} params
 * @param {*} method
 * @param {*} config
 * @param {*} autoShowError 是否自动弹出错误
 */
const request = (url, params, method = 'post', config = {}, autoShowError = true) => {
  return http[method](ApiPrefix + url, params, config)
    .then(data => {
      return data
    })
    .catch(err => {
      if (err.code === CODE.NO_LOGIN) {
        // 未登录或登录失效
        handleTokenFail()
      } else if (autoShowError && !err._responseError) {
        // 请求本身出的问题，在http中处理了，这边不再处理
        handleCommonError(err)
      }
      throw err
    })
}

export default request
