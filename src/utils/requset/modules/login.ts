/**
 * 请求
 */

import request from '../index'

export interface loginParams {
  staffCode: string
  password: string
  clientId: string
  verifyCode: string
}
interface loginReturn {
  token: string
  staffId: string
  targetUrl: string
}

// 登录
export const login = (params: loginParams) => request<loginReturn>('/sam/samStaff/login', params)

// 导出数据
// 发送统计导出
export const exportMessageSendRecord = (params: any) =>
  request<any>('/message-5g-menu/api/migu/exportQryMessageStatistics', { params: params, responseType: 'blob' }, 'get')
