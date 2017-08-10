import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import VueAnalytics from 'vue-analytics'

//Own components
import ServerStatus from './components/ServerStatus.vue'
import CustomFooter from './components/CustomFooter.vue'

const NotificationService = require('./shared/notification.service')

Vue.use(VueAxios, axios)
Vue.use(VueMoment, {
  moment
})
Vue.use(VueAnalytics, {
  id: 'UA-62902757-9'
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
