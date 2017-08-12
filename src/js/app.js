import Vue from 'vue'
import axios from 'axios'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

//Own components
import ServerStatus from './components/ServerStatus.vue'
import CustomFooter from './components/CustomFooter.vue'

const NotificationService = require('./shared/notification.service')

//Override $http prototype with axios instance
Vue.prototype.$http = axios.create()

Vue.use(VueMoment, {
  moment
})

new Vue({
  components: {
    ServerStatus,
    CustomFooter,
  },
  el: '#app',
  mounted: function () {
    if (NotificationService.isSupported)
      NotificationService.authorize()
  }
})
