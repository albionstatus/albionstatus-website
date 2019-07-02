<template>
  <div class="text-center">
    <div class="flex justify-center ">
      <div class="bg-status rounded-full p-12 mb-4">
        <transition
          mode="out-in"
          name="fade"
        >
          <component
            :is="iconComponent"
            :class="statusClasses"
            aria-role="presentational"
            class="w-32 fill-current"
          />
        </transition>
      </div>
    </div>
    <p class="text-gray-800 text-2xl md:text-5xl mb-3">
      The servers are
      <transition
        mode="out-in"
        name="fade"
      >
        <span
          :key="statusClasses"
          :class="statusClasses"
          class="underline"
        >
          {{ status }}
        </span>
      </transition>
    </p>
    <transition
      mode="out-in"
      name="fade"
    >
      <p
        v-if="showMessage"
        :key="message"
        class="text-grey-dark h4"
      >
        Message: {{ message }}
      </p>
    </transition>
    <transition
      mode="out-in"
      name="fade"
    >
      <p
        v-if="lastCheckedAt"
        class="text-grey-dark"
      >
        Last checked: {{ lastCheckedAt | moment('HH:mm:ss') }}
      </p>
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
  data() {
    return {
      status: '???',
      lastCheckedAt: null,
      message: '',
      isFirstCheck: true
    }
  },
  computed: {
    iconComponent() {
      const lookup = {
        online: 'check',
        offline: 'times',
        default: 'question'
      }

      const componentName = lookup[this.status] || lookup.default

      return () => import(`~/components/icons/${componentName}.svg`)
    },
    statusClasses() {
      const lookup = {
        online: 'text-green-700',
        offline: 'text-red-800',
        default: 'text-yellow-700'
      }
      return lookup[this.status] || lookup.default
    },
    showMessage() {
      return !['online', '???'].includes(this.status)
    }
  },
  watch: {
    status() {
      if (this.isFirstCheck) {
        // Ignore change from "???" to the real status
        this.isFirstCheck = false
        return
      }
      this.displayServerStatusNotification()
    }
  },
  mounted() {
    this.getStatus()
    setInterval(this.getStatus, 30 * 1000)

    // Ask for permission to send pushs
    NotificationService.authorize()
  },
  methods: {
    async getStatus() {
      try {
        const data = await this.$axios.$get('/current/')
        this.setStatus(data)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    },
    setStatus(data) {
      if (typeof data === 'undefined' || data.length === 0) {
        return
      }
      const [newestData] = data
      // Track last status so we know when to inform the user
      // of a status change.
      this.status = newestData.current_status
      this.lastCheckedAt = this.$moment(newestData.created_at)
      this.message = newestData.message
    },
    displayServerStatusNotification() {
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
