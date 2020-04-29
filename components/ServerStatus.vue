<template>
  <div class="mt-16 pt-16 pb-12 bg-gray-100 rounded sm:pb-16">
    <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-2">
          <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
            <dt id="item-1" class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
              Server status
            </dt>
            <dd class="order-1 text-5xl leading-none font-extrabold" :class="statusClasses" aria-describedby="item-1">
              {{ status }}
            </dd>
          </div>
          <div
            class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r"
          >
            <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
              Last checked at
            </dt>
            <dd class="order-1 text-5xl leading-none font-extrabold text-indigo-600">
              {{ formattedLastChecked || '...' }}
            </dd>
          </div>
        </dl>
        <Transition
          enter-active-class="transition-opacity ease-linear duration-300"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity ease-linear duration-300"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <dl v-show="showMessage" class="mt-4 rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-1">
            <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
              <dd class="text-3xl leading-none text-center text-gray-700">
                {{ message }}
              </dd>
            </div>
          </dl>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
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
      lastCheckedAt: null,
      message: '',
      isFirstCheck: true
    }
  },
  computed: {
    iconComponent () {
      const lookup = {
        online: 'check',
        offline: 'times',
        default: 'question'
      }

      const componentName = lookup[this.status] || lookup.default

      return () => import(`~/components/icons/${componentName}.svg`)
    },
    statusClasses () {
      const lookup = {
        online: 'text-green-500',
        offline: 'text-red-800',
        default: 'text-yellow-400'
      }
      return lookup[this.status] || lookup.default
    },
    showMessage () {
      return !['online', '???'].includes(this.status)
    },
    formattedLastChecked () {
      return this.lastCheckedAt && this.lastCheckedAt.toFormat('HH:mm:ss')
    }
  },
  watch: {
    status () {
      if (this.isFirstCheck) {
        // Ignore change from "???" to the real status
        this.isFirstCheck = false
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
        const data = await this.$axios.$get('/current/')
        this.setStatus(data)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    },
    setStatus (data) {
      if (typeof data === 'undefined' || data.length === 0) {
        return
      }
      const [newestData] = data
      // Track last status so we know when to inform the user
      // of a status change.
      this.status = newestData.current_status
      this.lastCheckedAt = DateTime.fromISO(newestData.created_at)
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
