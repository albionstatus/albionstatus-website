<template>
  <svg
    preserveAspectRatio="none"
    height="34"
    viewBox="0 0 355 75"
    class="w-full mx-auto h-16 mt-4">
    <rect
      v-tooltip="`${percent} percent (${minutes} minutes) outage`"
      v-for="({percent, minutes},i) in dataByHours"
      :key="i"
      :fill="getFillForPercent(percent)"
      :x="15*i"
      height="75"
      width="10"
      y="0"/>
  </svg>
</template>
<script>
import { colors } from '~/tailwind.js'

const roundPrecision = (n, p) => {
  const f = Math.pow(10, p)
  return Math.round(n * f) / f
}

export default {
  data () {
    return {
      data: [],
      hours: []
    }
  },
  computed: {
    dataByHours () {
      return this.data.reduce((acc, currentData) => {
        acc[Number(currentData.created_at.slice(11, 13)).valueOf()].push(currentData.current_status === 'online')
        return acc
      }, Array.from({length: 24}, v => []))
        .map(h => ({
          percent: roundPrecision(h.filter(d => !d).length * 100 / h.length, 2),
          minutes: h.filter(d => !d).length
        }))
    }
  },
  async mounted () {
    this.rebuildChart()
    setInterval(this.rebuildChart, 30 * 1000)
  },
  methods: {
    async fetchData () {
      let {data} = await this.$axios.get(`?timestamp=${this.$moment(new Date()).set('hours', 0).set('minutes', 0).set('seconds', 0).subtract(1, 'days').format()}`)
      this.data = data.reverse()
    },
    async rebuildChart () {
      await this.fetchData()
    },
    getFillForPercent (percent) {
      const fillMap = {
        0: colors['green-dark'],
        5: colors['green-light'],
        20: colors['yellow'],
        40: colors['yellow-dark'],
        60: colors['orange-dark'],
        100: colors.red
      }
      return Object.keys(fillMap).reduce((acc, key) => {
        if (isNaN(acc)) {
          return acc
        }

        return acc > key ? acc : fillMap[key]
      }, percent)
    }
  }
}
</script>
