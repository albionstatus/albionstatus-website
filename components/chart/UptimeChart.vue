<template>
  <svg
    class="w-full mx-auto h-16 mt-4"
    height="34"
    preserveAspectRatio="none"
    viewBox="0 0 355 75"
  >
    <chart-rect
      v-for="({ percent, minutes }, i) in dataByHours"
      :key="i"
      :minutes="minutes"
      :percent="percent"
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

export default {
  components: { ChartRect },
  data() {
    return {
      data: []
    }
  },
  computed: {
    dataByHours() {
      const multiDimensionalHourArray = Array.from({ length: 24 }, () => [])

      for (const currentData of this.data) {
        const hourFromCreatedAtDate = Number(currentData.created_at.slice(11, 13))
        const hourArray = multiDimensionalHourArray[hourFromCreatedAtDate]
        const serverOnlineAtTime = currentData.current_status === 'online'
        hourArray.push(serverOnlineAtTime)
      }

      return multiDimensionalHourArray
        .map((hourArray) => {
          const onlineMinutes = hourArray.filter(d => !d).length
          const totalMinutestTracked = hourArray.length

          return {
            percent: roundPrecision(onlineMinutes * 100 / totalMinutestTracked, 2),
            minutes: onlineMinutes
          }
        })
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
        .set('hours', 0)
        .set('minutes', 0)
        .set('seconds', 0)
        .subtract(1, 'days')
        .format()

      const { data } = await this.$axios.get(`?timestamp=${timestamp}`)
      this.data = data.reverse()
    }
  }
}
</script>
