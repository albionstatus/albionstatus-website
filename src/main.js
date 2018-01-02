import Vue from 'vue'
import axios from 'axios'
import VueAnalytics from 'vue-analytics'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

import App from './App'
import Ad from './components/Ad'
import router from './router'
import * as NotificationService from './shared/NotificationService'

Vue.config.productionTip = false

const axiosInstance = axios.create()
axiosInstance.defaults.baseURL = 'https://api.albionstatus.com/'
axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

Vue.prototype.$http = axiosInstance

Vue.component('ad', Ad)
Vue.use(VueAnalytics, {
  id: 'UA-62902757-9',
  router,
  autoTracking: {
    exception: true
  }
})
Vue.use(VueMoment, {
  moment
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  mounted () {
    if (NotificationService.isSupported) {
      NotificationService.authorize()
    }
  }
})
