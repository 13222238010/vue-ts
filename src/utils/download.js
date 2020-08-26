export const CONTENT_TYPE_BLOB = [
  'text/plain',
  'application/csv',
  'application/x-xls',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/pdf',
  'application/msword',
  'application/x-msdownload',
  'application/zip',
  'audio/mpeg',
  'video/mp4',
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
]

export const CONTENT_TYPE_BLOB_SUFFIX = {
  'text/plain': '.txt',
  'application/csv': '.csv',
  'application/x-xls': '.xls',
  'application/vnd.ms-excel': '.xls',
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'audio/mpeg': '.mp3',
  'video/mp4': '.mp4',
  'image/png': '.png',
  'image/jpg': '.jpg',
  'image/jpeg': '.jpeg',
  'image/gif': '.gif',
}

/**
 * 下载blob流
 * @param {String} contentType 文档类型
 * @param {Blob} blob
 * @param {String} fileName 文件名
 */
export function downloadBlob(contentType, blob, fileName) {
  blob = new Blob([blob], { type: contentType })
  fileName = fileName || `${new Date().getTime()}${CONTENT_TYPE_BLOB_SUFFIX[contentType]}`
  if ('download' in document.createElement('a')) {
    // 非IE下载
    download(URL.createObjectURL(blob), fileName)
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}

/**
 * 下载文件
 * @param {Blob|String} data Blob文件流数据 或者 图片Base64编码
 * @param {String} fileName 文件名
 */
function download(data, fileName) {
  const link = document.createElement('a')
  link.download = fileName
  link.style.display = 'none'
  link.href = data
  document.body.appendChild(link)
  link.click()
  URL.revokeObjectURL(link.href)
  document.body.removeChild(link)
}

/**
 * 下载图片Base64编码
 * @param {String} base64
 * @param {String} dataType 图片类型。eg： 'image/png'
 */
export function downloadImageBase64(base64, fileName, dataType = 'image/png') {
  const data = base64.replace(dataType, 'application/octet-stream')
  download(data, fileName)
}

/**
 * 下载zip
 */
export function downloadzip(data, fileName) {
  download(data, fileName)
}

/**
 * 跨域下载文件
 * @param {*} url http://1.2.3.4:8888/group1/asd/asd/asd.xlx
 * @param {*} fileName 模板.xlx
 */
export function downloadCrossOrigin(url, fileName) {
  return download(url.replace(/.*(?=(\/group1|\/group0))/, ''), fileName)
}
