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
        <dl class="mt-4 rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-1">
          <div
            class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r"
          >
            <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
              Operating since
            </dt>
            <dd class="order-1 text-4xl leading-none font-extrabold text-gray-500">
              {{ operatingSince }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { showNotification, isNotificationSendingSupported } from '~/shared/NotificationService'
import { DATE_OF_CREATION } from '@/shared/constants'

/*
 * Constants
 */
const SERVER_STATUS_NOTIFICATION = {
  TITLE: 'AlbionStatus - Server status changed',
  BODY_PREFIX: 'The server is now',
  TAG: 'server-status-notification',
  TIMEOUT: 10000,
  ICON: ''
}
export default {
  async fetch () {
    try {
      const data = await this.$http.$get('/current/')
      this.setStatus(data)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
  fetchOnServer: false,
  data () {
    return {
      status: '???',
      lastCheckedAt: undefined,
      message: '',
      isFirstCheck: true
    }
  },
  computed: {
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
      return this.lastCheckedAt?.toFormat('HH:mm:ss')
    },
    operatingSince () {
      const units = ['years', 'months', 'days', 'hours']
      const duration = DateTime.local().diff(DateTime.fromISO(DATE_OF_CREATION), units)

      return units
        .map(u => duration[u] ? `${Math.ceil(duration[u])} ${u}` : false)
        .filter(Boolean)
        .join(', ')
        .replace(/,([^,]*)$/, ' and $1')
    }
  },
  watch: {
    status () {
      // Ignore change from "???" to the real status
      if (this.isFirstCheck) {
        this.isFirstCheck = false
        return
      }
      this.displayServerStatusNotification()
    }
  },
  mounted () {
    setInterval(() => this.$fetch(), 30 * 1000)
  },
  methods: {
    setStatus (data) {
      const hasNoData = typeof data === 'undefined' || data.length === 0
      if (hasNoData) {
        return
      }
      const [newestData] = data

      // Track last status so we know when to inform the user of a status change
      this.status = newestData.current_status
      this.lastCheckedAt = DateTime.fromISO(newestData.created_at)
      this.message = newestData.message
    },
    displayServerStatusNotification () {
      if (!isNotificationSendingSupported) {
        return
      }

      showNotification(SERVER_STATUS_NOTIFICATION.TITLE, {
        body: `${SERVER_STATUS_NOTIFICATION.BODY_PREFIX} ${this.status}!`,
        tag: SERVER_STATUS_NOTIFICATION.TAG,
        closeAfter: SERVER_STATUS_NOTIFICATION.TIMEOUT,
        icon: SERVER_STATUS_NOTIFICATION.ICON
      })
    }
  }
}
</script>
