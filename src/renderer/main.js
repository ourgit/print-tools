import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
// 引用element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 日志
import './error'
import './icons'
import '@/styles/index.scss'
import '@/styles/dark-mode.scss'

if (!process.env.IS_WEB) {
  if (!require('../../config').IsUseSysTitle) {
    require('@/styles/custom-title.scss')
  }
}

// import * as filters from '@/utils/filters'

// Object.keys(filters).forEach((key) => {
//   Vue.prototype[`$${key}`] = filters[key]
//   Vue.filter(key, filters[key])
// })

import Print from '@/utils/print'

Vue.use(Print)

import { mmToPx, calcStyle } from '@/utils/unitConversion'
Vue.prototype.$mmToPx = mmToPx
Vue.prototype.$calcStyle = calcStyle

Vue.use(ElementUI)

Vue.config.productionTip = false
/* eslint-disable no-new */
const vue = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app')

export default vue
