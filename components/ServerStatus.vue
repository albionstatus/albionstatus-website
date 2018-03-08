<template>
  <div class="text-center">
    <span class="fa-stack text-10xl md:text-25xl mb-4">
      <i class="fa fa-stack-2x bg-status rounded-full h-inherit w-inherit"/>
      <transition
        name="fade"
        mode="out-in">
        <i
          :class="`${statusClasses} ${statusIconClasses}`"
          :key="statusClasses"
          class="fa fa-fw fa-stack-1x"/>
      </transition>
    </span>
    <p class="text-grey-darker text-2xl md:text-5xl mb-3">The servers are
      <transition
        name="fade"
        mode="out-in">
        <span
          :key="statusClasses"
          :class="statusClasses"
          class="underline">
          {{ status }}
        </span>
      </transition>
    </p>
    <transition
      name="fade"
      mode="out-in">
      <p
        v-if="showMessage"
        :key="message"
        class="text-grey-dark h4">Message: {{ message }}</p>
    </transition>
    <transition
      name="fade"
      mode="out-in">
      <p
        v-if="lastChecked"
        class="text-grey-dark">
        Last checked: {{ lastChecked | moment('HH:mm:ss') }}</p>
    </transition>
  </div>
</template>

<script>
import * as NotificationService from '~/shared/NotificationService'
/*
 * Constants
 */
const SERVER_STATUS_NOTIFICATION_TITLE = 'AlbionStatus - Server status changed'
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
      firstCheck: true
    }
  },
  computed: {
    statusIconClasses () {
      return this.status === 'online'
        ? 'fa-check'
        : this.status === 'offline'
          ? 'fa-times'
          : 'fa-question'
    },
    statusClasses () {
      return this.status === 'online'
        ? 'text-green-dark'
        : this.status === 'offline'
          ? 'text-red-dark'
          : 'text-yellow-dark'
    },
    showMessage () {
      return !['online', '???'].includes(this.status)
    }
  },
  watch: {
    status () {
      if (this.firstCheck) {
        // Ignore change from "???" to the real status
        this.firstCheck = false
        return
      }
      this.displayServerStatusNotification()
    }
  },
  mounted () {
    this.getStatus()
    setInterval(this.getStatus, 30 * 1000)
  },
  methods: {
    async getStatus () {
      try {
        let data = await this.$axios.$get('/current/')
        this.setStatus(data)
      } catch (e) {
        console.log(e)
      }
    },
    setStatus (data) {
      if (typeof data === 'undefined' || data.length === 0) {
        return
      }
      const newestData = data[0]
      // Track last status so we know when to inform the user
      // of a status change.
      this.status = newestData.current_status
      this.lastChecked = this.$moment(newestData.created_at)
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
  }
}
</script>
