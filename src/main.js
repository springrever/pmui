import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css
import 'babel-polyfill'
import App from './App'
import router from './router'
import store from './store'
// 引入echarts
// import echarts from 'echarts'
import '@/icons' // icon
import '@/permission' // permission control

// import './mock' //  使用mockjs 模拟数据

import * as filters from './filters' // 全局过滤器

Vue.use(ElementUI, store, { locale }, router)

// 注册全局过滤器.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.config.silent = true
Vue.prototype.globalClick = function(callback) {
  document.getElementById('mainBody').onclick = function() {
    callback()
  }
}

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
