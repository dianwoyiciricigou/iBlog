import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false


import http from './http'
//在原型上添加$http属性，让每一个实例都能用axios文件
Vue.prototype.$http = http;

new Vue({
  axios,
  router,
  render: h => h(App)
}).$mount('#app')
