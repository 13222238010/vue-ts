import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import element from './plugins/element-ui'
import service from './utils/http'
import urls from './utils/apis'

Vue.prototype.$https = service // 其他页面在使用 axios 的时候直接  this.$http 就可以了
Vue.prototype.$urls = urls // 其他页面在使用 urls 的时候直接  this.$urls 就可以了

Vue.use(element)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
