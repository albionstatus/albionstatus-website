<template>
  <svg
    preserveAspectRatio="none"
    height="34"
    viewBox="0 0 355 75"
    class="w-full mx-auto h-16 mt-4">
    <chart-rect
      v-for="({ percent, minutes },i) in dataByHours"
      :key="i"
      :percent="percent"
      :minutes="minutes"
      :position="i"/>
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
  data () {
    return {
      data: [],
      hours: []
    }
  },
  computed: {
    dataByHours () {
      return this.data
        .reduce((acc, currentData) => {
          const hourArray = acc[Number(currentData.created_at.slice(11, 13)).valueOf()]
          hourArray.push(currentData.current_status === 'online')

          return acc
        }, Array.from({ length: 24 }, () => []))
        .map(hourArray => ({
          percent: roundPrecision(hourArray.filter(d => !d).length * 100 / hourArray.length, 2),
          minutes: hourArray.filter(d => !d).length
        }))
    }
  },
  async beforeMount () {
    await this.fetchData()
  },
  mounted () {
    setInterval(this.fetchData, 30 * 1000)
  },
  methods: {
    async fetchData () {
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
