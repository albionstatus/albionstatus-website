import { DateTime } from 'luxon'
import type { DurationUnits } from 'luxon'
import { DATE_OF_CREATION } from '@/shared/constants'
import type { StatusApiResponse } from '~/types'

const SERVER_STATUS_NOTIFICATION = {
  TITLE: 'AlbionStatus - Server status changed',
  BODY_PREFIX: 'The server is now',
  TAG: 'server-status-notification',
  TIMEOUT: 10000,
  ICON: '',
}

const STATUS_CLASS_LOOKUP: Record<string, string> = {
  online: 'text-green-700',
  offline: 'text-red-800',
  default: 'text-yellow-400',
}

export function useStatus (server: 'was' | 'ams' | 'sgp') {
  const status = ref('???')
  const isFirstCheck = ref(true)
  const statusClasses = computed(() => STATUS_CLASS_LOOKUP[status.value] ?? STATUS_CLASS_LOOKUP.default)

  const lastCheckedAt = ref<DateTime | null>(null)
  const formattedLastCheckedAt = computed(() => lastCheckedAt.value?.toFormat('HH:mm:ss') ?? '...')

  const message = ref('')
  const showMessage = computed(() => !['online', '???'].includes(status.value))

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
    icon: SERVER_STATUS_NOTIFICATION.ICON,
  })

  function displayServerStatusNotification () {
    if (!isSupported.value)
      return

    show()
    setTimeout(() => {
      close()
    }, SERVER_STATUS_NOTIFICATION.TIMEOUT)
  }

  const { data, refresh: refresh } = useFetch<StatusApiResponse>(`/api/status/${server}`, { server: false, key: `status-call-${server}` })
  watch(data, (data) => {
    if (!data)
      return

    setStatus(data)
  })

  useIntervalFn(() => {
    refresh()
  }, 30 * 1000)

  function setStatus (newStatus: StatusApiResponse) {
    // Track last status so we know when to inform the user of a status change
    status.value = newStatus.type
    lastCheckedAt.value = DateTime.fromISO(newStatus.created_at)
    message.value = newStatus.message ?? ''
  }

  return {
    status: readonly(status),
    statusClasses: readonly(statusClasses),
    formattedLastCheckedAt: readonly(formattedLastCheckedAt),
    message: readonly(message),
    showMessage
  }
}