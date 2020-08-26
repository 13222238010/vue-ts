enum STORAGE_KEY {
  LOGGED_USER = 'LOGGED_USER',
  TOKEN = '5G_CM_TOKEN',
  STAFF = 'STAFF',
}

/**
 * 获取登录过的用户名
 */
export function getLoggedUsers(): string[] {
  let users = []
  try {
    const usersStr = localStorage.getItem(STORAGE_KEY.LOGGED_USER)
    if (usersStr) {
      const usersParsed = JSON.parse(usersStr)
      if (Array.isArray(usersParsed)) {
        users = usersParsed
      }
    }
  } catch (err) {
    //
  }
  return users
}

/**
 * 增加登录过的用户名
 */
export function addLoggedUsers(user: string) {
  let loggedUsers = getLoggedUsers()
  const index = loggedUsers.indexOf(user)
  if (index > -1) {
    // 如果存在则去掉
    loggedUsers.splice(index, 1)
  }
  loggedUsers.unshift(user) // 加在最前面
  localStorage.setItem(STORAGE_KEY.LOGGED_USER, JSON.stringify(loggedUsers))
}

interface LoginInfo {
  token: string
  staffId: string
}

export function setLoginInfo(loginInfo: LoginInfo) {
  sessionStorage.setItem(STORAGE_KEY.TOKEN, loginInfo.token)
  sessionStorage.setItem(STORAGE_KEY.STAFF, loginInfo.staffId)
}

export function getLoginInfo(): { token: string | null; staffId: string | null } {
  const token = sessionStorage.getItem(STORAGE_KEY.TOKEN)
  const staffId = sessionStorage.getItem(STORAGE_KEY.STAFF)
  return {
    token: token,
    staffId: staffId,
  }
}

export function removeLoginInfo() {
  sessionStorage.removeItem(STORAGE_KEY.TOKEN)
  sessionStorage.removeItem(STORAGE_KEY.STAFF)
}

/**
 * 接口要带上的header
 */
export function getCommonHeader() {
  const { token, staffId } = getLoginInfo()
  return {
    token: encodeURIComponent(token || ''),
    staffId: encodeURIComponent(staffId || ''),
    channelType: '01', // 接入渠道 01 WEB;02 短信;03 WAP; 04 IVR;05自助终端;
  }
}

/**
 * 去除登录信息后，跳转至/，这样可以刷新页面，清除redux store。
 */
export function initLogin() {
  removeLoginInfo()
  window.location.href = '/'
}
