import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import VueAdsense from 'vue-adsense'

//Own components
import ServerStatus from './components/ServerStatus.vue'
import CustomFooter from './components/CustomFooter.vue'

const NotificationService = require('./shared/notification.service')

Vue.use(VueAxios, axios)
Vue.use(VueMoment, {
  moment
})
Vue.component('adsense', VueAdsense)

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
