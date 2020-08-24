import { onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'

export function useInterval (cb, interval) {
  let timer = null

  const stop = () => {
    if (!timer) {
      return
    }

    clearInterval(timer)
    timer = null
  }

  const start = () => {
    stop()
    timer = setInterval(cb, interval)
  }

  onMounted(start)
  onBeforeUnmount(stop)

  return { start, stop }
}
