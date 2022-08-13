import Vue from 'vue'
import App from './App.vue'
//全局引入element-ui 和其css文件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入vue-router
import router from './router'
import store from '../store'
//axios不是插件，要在全局使用，需要绑定到prototype上
import http from 'axios'

import './assets/less/index.less'
import '../api/mock.js'

Vue.config.productionTip = false
//将element-ui全局注入到项目中
Vue.use(ElementUI)

Vue.prototype.$http = http
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
