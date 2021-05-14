<template>
  <div style="min-height: 650px">
    <VueFrappe
      v-show="shouldDisplayChart"
      id="uptime-chart-24-hours"
      type="bar"
      title="Server uptime of the last 24 hours"
      :bar-options="{ stacked: true }"
      :labels="labels"
      :height="650"
      :colors="['#868686', '#b13c28', '#008F68']"
      :tooltip-options="{
        formatTooltipX: formattedDateHour,
        formatTooltipY: d => `${d} minutes`
      }"
      :line-options="{regionFill: 1}"
      :data-sets="dataSets"
    />
  </div>
</template>

<script lang="ts">
import { DateTime } from 'luxon'
import VueFrappe from 'vue2-frappe/src/components/Charts/Chart.vue'
import { computed, ref, useContext, useFetch } from '@nuxtjs/composition-api'
import { useIntervalFn } from '@vueuse/core'

const rotateArray = (arr, n) => arr.slice(n, arr.length).concat(arr.slice(0, n))

export default {
  components: {
    VueFrappe
  },
  fetchOnServer: false,
  setup () {
    const { $http } = useContext()
    const data = ref([])

    const { fetch } = useFetch(async () => {
      const timestamp = DateTime.utc().minus({ days: 1 }).toISO()

      const res = await $http.$get(`?timestamp=${timestamp}`)
      data.value = res.reverse()
    })

    const THIRTY_SECONDS = 30 * 1000
    useIntervalFn(() => { fetch() }, THIRTY_SECONDS)

    const formattedHour = d => d < 12
      ? `${d === 0 ? 12 : d}am`
      : `${d === 12 ? 12 : d - 12}pm`

    const shiftedHourData = computed(() => {
      const multiDimensionalHourArray = Array.from({ length: 24 }, () => [])

      for (const currentData of data.value) {
        const hourFromCreatedAtDate = Number(currentData.created_at.slice(11, 13))
        const hourArray = multiDimensionalHourArray[hourFromCreatedAtDate]
        const serverOnlineAtTime = currentData.current_status === 'online'
        hourArray.push(serverOnlineAtTime)
      }

      const mappedHourData = multiDimensionalHourArray.map((hourArray, index) => {
        const offlineMinutes = hourArray.filter(d => !d).length
        const totalMinutesTracked = hourArray.length

        return {
          onlineMinutes: totalMinutesTracked - offlineMinutes,
          offlineMinutes,
          hour: index
        }
      })

      return rotateArray(mappedHourData, (new Date()).getUTCHours())
    })
    const labels = computed(() => shiftedHourData.value.map(d => formattedHour(d.hour)))
    const dataSets = computed(() => [
      { name: 'not tracked', values: shiftedHourData.value.map(d => 60 - d.offlineMinutes - d.onlineMinutes) },
      { name: 'offline', values: shiftedHourData.value.map(d => d.offlineMinutes) },
      { name: 'online', values: shiftedHourData.value.map(d => d.onlineMinutes) }
    ])
    const shouldDisplayChart = computed(() => shiftedHourData.value.length &&
        labels.value.length &&
        dataSets.value[0]?.values.length
    )

    const isForToday = (hourIn12Format) => {
      const isPm = hourIn12Format.endsWith('pm')
      const [hourNumberString] = hourIn12Format.match(/^(\d+)/)
      const hour = Number(hourNumberString) + (isPm ? 12 : 0)

      return hour < new Date().getUTCHours()
    }

    const formattedDateHour = (hourString) => {
      const day = isForToday(hourString) ? 'Today' : 'Yesterday'

      return `${day} ${hourString} UTC`
    }

    return { dataSets, labels, shouldDisplayChart, formattedDateHour }
  }
}
</script>
