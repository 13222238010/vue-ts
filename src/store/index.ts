import Vue from 'vue'
import Vuex from 'vuex'
const path = require('path')

Vue.use(Vuex)
const files = require.context('./modules', false, /\.js$/)

let modules: any = {}
files.keys().forEach(key => {
  let name = path.basename(key, '.js')
  modules[name] = files(key).default || files(key)
})

const store = new Vuex.Store({
  actions: {},
  modules,
})
export default store
