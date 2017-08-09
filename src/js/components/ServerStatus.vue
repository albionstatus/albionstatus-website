<template>
    <div class="col-md-8 col-md-offset-2 text-center">
            <span id="server-status">
                <i id="server-status-background"></i>
                <transition name="fade" mode="out-in">
                    <i :class="statusClasses +' '+ statusIconClasses"
                       id="server-status-icon"
                       :key="statusClasses"></i>
                </transition>
            </span>
        <p class="text-muted h1">The servers are
            <transition name="fade" mode="out-in">
                <span :key="statusClasses" class="text-underline"
                      :class="statusClasses">
                    {{status}}
                </span>
            </transition>
        </p>
        <transition name="fade" mode="out-in">
            <p class="text-muted h4" :key="message"
               v-if="showMessage">Message: {{message}}</p>
        </transition>
        <transition name="fade" mode="out-in">
            <p class="text-muted"
               v-if="lastChecked !== null">
                Last checked: {{ lastChecked | moment("HH:mm:ss") }}</p>
        </transition>
    </div>
</template>

<script>
  import Vue from 'vue'
  import moment from 'moment-timezone'

  const NotificationService = require('../shared/notification.service')

  /*
   * Constants
   */

  const SERVER_STATUS_NOTIFICATION_TITLE = 'Albion Server Status'
  const SERVER_STATUS_NOTIFICATION_BODY_PREFIX = 'The server is now'
  const SERVER_STATUS_NOTIFICATION_TAG = 'server-status-notification'
  const SERVER_STATUS_NOTIFICATION_TIMEOUT = 10000
  const SERVER_STATUS_NOTIFICATION_ICON = ''

  export default {
    data () {
      return {
        status: '???',
        lastChecked: null,
        message: '',
        firstTimeChanged: false,
      }
    },
    watch: {
      status: function () {
        if (!this.firstTimeChanged) {
          //Ignore change from "???" to the real status
          this.firstTimeChanged = true
          return
        }
        this.displayServerStatusNotification()
      },
    },
    computed: {
      statusIconClasses () {
        if (this.status === 'online') {
          return 'fa-check'
        } else if (this.status === 'offline') {
          return 'fa-times'
        }
        return 'fa-question'
      },
      statusClasses () {
        if (this.status === 'online') {
          return 'text-success'
        } else if (this.status === 'offline') {
          return 'text-danger'
        }
        return 'text-warning'
      },
      showMessage () {
        return this.status !== 'online' && this.status !== '???'
      }
    },
    methods: {
      getStatus () {
        this.axios.get('https://api.albionstatus.com/current/')
          .then(({data}) => this.setStatus(data))
          .catch((err) => console.log(err))
      },
      setStatus (data) {
        if (typeof data === 'undefined' || data.length === 0) {
          return
        }
        const newestData = data[0]
        // Track last status so we know when to inform the user
        // of a status change.
        this.status = newestData.current_status
        this.lastChecked = moment(newestData.created_at)
        this.message = newestData.message
      },
      displayServerStatusNotification () {
        if (NotificationService.isSupported) {
          NotificationService.show(SERVER_STATUS_NOTIFICATION_TITLE, {
            body: `${SERVER_STATUS_NOTIFICATION_BODY_PREFIX} ${this.status}!`,
            tag: SERVER_STATUS_NOTIFICATION_TAG,
            closeAfter: SERVER_STATUS_NOTIFICATION_TIMEOUT,
            icon: SERVER_STATUS_NOTIFICATION_ICON
          })
        }
      }
    },

    mounted () {
      NotificationService.authorize()
      this.getStatus()
      setInterval(() => this.getStatus(), 30 * 1000)
    }
  }
</script>
