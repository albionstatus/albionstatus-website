<template>
  <VueFrappe
    id="uptime-chart-24-hours"
    type="bar"
    title="Server uptime of the last 24 hours"
    :bar-options="{ stacked: true }"
    :labels="shiftedHourData.map(d => formattedHour(d.hour))"
    :height="650"
    :colors="['#868686', '#b13c28', '#008F68']"
    :tooltip-options="{
      formatTooltipX: formattedDateHour,
      formatTooltipY: d => `${d} minutes`
    }"
    :line-options="{regionFill: 1}"
    :data-sets="[
      {name: 'not tracked', values: shiftedHourData.map(d => 60 - d.offlineMinutes - d.onlineMinutes)},
      {name: 'offline', values: shiftedHourData.map(d => d.offlineMinutes)},
      {name: 'online', values: shiftedHourData.map(d => d.onlineMinutes)},
    ]"
  />
</template>
<script>
import { DateTime } from 'luxon'
import VueFrappe from 'vue2-frappe/src/components/Charts/Chart.vue'

const rotateArray = (arr, n) => arr.slice(n, arr.length).concat(arr.slice(0, n))

export default {
  components: {
    VueFrappe
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    shiftedHourData () {
      const multiDimensionalHourArray = Array.from({ length: 24 }, () => [])

      for (const currentData of this.data) {
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
    }
  },
  beforeMount () {
    this.fetchData()
  },
  mounted () {
    const handler = setInterval(this.fetchData, 30 * 1000)
    this.$once('hook:beforeDestroy', () => { clearInterval(handler) })
  },
  methods: {
    async fetchData () {
      const timestamp = DateTime.utc().minus({ days: 1 }).toISO()

      const { data } = await this.$axios.get(`?timestamp=${timestamp}`)
      this.data = data.reverse()
    },
    formattedDateHour (hourString) {
      const day = this.isForToday(hourString) ? 'Today' : 'Yesterday'

      return `${day} ${hourString} UTC`
    },
    formattedHour (d) {
      return d < 12
        ? `${d === 0 ? 12 : d}am`
        : `${d === 12 ? 12 : d - 12}pm`
    },
    isForToday (hourIn12Format) {
      const isPm = hourIn12Format.endsWith('pm')
      const [hourNumberString] = hourIn12Format.match(/^(\d+)/)
      const hour = Number(hourNumberString) + (isPm ? 12 : 0)

      return hour < new Date().getUTCHours()
    }
  }
}
</script>
