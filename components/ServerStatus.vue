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
            class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
            <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
              Last checked at
            </dt>
            <dd class="order-1 text-5xl leading-none font-extrabold text-indigo-600">
              {{ formattedLastCheckedAt }}
            </dd>
          </div>
        </dl>
        <Transition enter-active-class="transition-opacity ease-linear duration-300" enter-class="opacity-0"
          enter-to-class="opacity-100" leave-active-class="transition-opacity ease-linear duration-300"
          leave-class="opacity-100" leave-to-class="opacity-0">
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
            class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
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

<script setup lang="ts">
import { DateTime } from 'luxon'
import type { DurationUnits } from 'luxon'
import { DATE_OF_CREATION } from '@/shared/constants'
import { ChartApiResponse } from '~/types'

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

const status = ref('???')
const statusClassLookup: Record<string, string> = {
  online: 'text-green-700',
  offline: 'text-red-800',
  default: 'text-yellow-400'
}
const statusClasses = computed(() => statusClassLookup[status.value] ?? statusClassLookup.default)

const lastCheckedAt = ref<DateTime | null>(null)
const formattedLastCheckedAt = computed(() => lastCheckedAt.value?.toFormat('HH:mm:ss') ?? '...')

const message = ref('')
const showMessage = computed(() => !['online', '???'].includes(status.value))

const isFirstCheck = ref(true)
watch(status, () => {
  // Ignore change from "???" to the real status
  if (isFirstCheck.value) {
    isFirstCheck.value = false
    return
  }
  displayServerStatusNotification()
})

const { isSupported, show, close } = useWebNotification({
  title: SERVER_STATUS_NOTIFICATION.TITLE,
  body: `${SERVER_STATUS_NOTIFICATION.BODY_PREFIX} ${status.value}!`,
  tag: SERVER_STATUS_NOTIFICATION.TAG,
  icon: SERVER_STATUS_NOTIFICATION.ICON
})

function displayServerStatusNotification() {
  if (!isSupported.value) {
    return
  }
  show()
  setTimeout(() => {
    close()
  }, SERVER_STATUS_NOTIFICATION.TIMEOUT)
}

const units: DurationUnits = ['years', 'months', 'days', 'hours']
const duration = DateTime.local().diff(DateTime.fromISO(DATE_OF_CREATION), units)
const operatingSince = units.map(u => duration.get(u) && `${Math.ceil(duration.get(u))} ${u}`)
  .filter(Boolean)
  .join(', ')
  .replace(/,([^,]*)$/, ' and $1')

const { data, refresh } = useFetch<ChartApiResponse[]>('/api/status/current/', { server: false })
watch(data, (data) => {
  if (!data?.length) {
    return
  }
  setStatus(data)
})

useIntervalFn(() => {
  refresh()
}, 30 * 1000)

function setStatus(data: ChartApiResponse[]) {
  const [newestData] = data

  // Track last status so we know when to inform the user of a status change
  status.value = newestData.current_status
  lastCheckedAt.value = DateTime.fromISO(newestData.created_at)
  message.value = newestData.message ?? ''
}
</script>
