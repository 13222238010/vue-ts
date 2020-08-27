interface state {
  opened: string | null
  msgIsShow: boolean
  showDriver: string | null
}

/*
set sidebar open or close,and some app setting
 */
const state: any = {
  opened: sessionStorage.getItem('open') ? sessionStorage.getItem('open') : 'false',
  msgIsShow: false,
  showDriver: localStorage.getItem('driver') ? localStorage.getItem('driver') : 'yes',
}
const mutations = {
  SET_OPENED(state: state, payload: any) {
    state.opened = String(payload)
    sessionStorage.setItem('open', payload)
  },
  SET_MSGISOPEN(state: state) {
    state.msgIsShow = !state.msgIsShow
  },
  SET_DRIVER(state: state, payload: any) {
    state.showDriver = payload
    localStorage.setItem('driver', payload)
  },
}
export default {
  namespaced: true,
  state,
  mutations,
}
