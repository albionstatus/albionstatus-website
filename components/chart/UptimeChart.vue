<template>
  <svg
    class="w-full mx-auto h-16 mt-4"
    height="34"
    preserveAspectRatio="none"
    viewBox="0 0 355 75"
  >
    <chart-rect
      v-for="({ percent, minutes, hour }, i) in shiftedHourData"
      :key="i"
      :minutes="minutes"
      :percent="percent"
      :hour="hour"
      :position="i"
    />
  </svg>
</template>
<script>
import ChartRect from '~/components/chart/ChartRect'

const roundPrecision = (n, p) => {
  const f = Math.pow(10, p)
  return Math.round(n * f) / f
}

const rotateArray = (arr, n) => arr.slice(n, arr.length).concat(arr.slice(0, n))

export default {
  components: { ChartRect },
  data() {
    return {
      data: []
    }
  },
  computed: {
    shiftedHourData() {
      const multiDimensionalHourArray = Array.from({ length: 24 }, () => [])

      for (const currentData of this.data) {
        const hourFromCreatedAtDate = Number(currentData.created_at.slice(11, 13))
        const hourArray = multiDimensionalHourArray[hourFromCreatedAtDate]
        const serverOnlineAtTime = currentData.current_status === 'online'
        hourArray.push(serverOnlineAtTime)
      }

      const mappedHourData = multiDimensionalHourArray
        .map((hourArray, index) => {
          const onlineMinutes = hourArray.filter(d => !d).length
          const totalMinutesTracked = hourArray.length

          return {
            percent: roundPrecision(onlineMinutes * 100 / totalMinutesTracked, 2),
            minutes: onlineMinutes,
            hour: index
          }
        })

      return rotateArray(mappedHourData, (new Date()).getUTCHours())
    }
  },
  beforeMount() {
    this.fetchData()
  },
  mounted() {
    setInterval(this.fetchData, 30 * 1000)
  },
  methods: {
    async fetchData() {
      const timestamp = this.$moment(new Date())
        .subtract(1, 'days')
        .utc()
        .format()

      const { data } = await this.$axios.get(`?timestamp=${timestamp}`)
      this.data = data.reverse()
    }
  }
}
</script>
