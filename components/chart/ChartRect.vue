<template>
  <rect
    :fill="fill"
    :x="15 * position"
    height="75"
    stroke="black"
    stroke-linecap="square"
    :stroke-width="isForToday ? 0.4 : 0"
    v-tooltip="`From ${isForToday ? 'today' : 'yesterday'} ${styledHour} on: ${percent}% (${minutes} minutes) outage`"
    width="10"
    y="0"
  />
</template>
<script>
import { VTooltip as tooltip } from 'v-tooltip'
import { colors } from '~/tailwind/values'

export default {
  directives: {
    tooltip
  },
  props: {
    percent: {
      type: [Number, String],
      required: true
    },
    minutes: {
      type: [Number, String],
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    hour: {
      type: Number,
      required: true
    }
  },
  computed: {
    styledHour() {
      return this.hour < 12
        ? `${this.hour === 0 ? 12 : this.hour}am`
        : `${this.hour === 12 ? 12 : this.hour - 12}pm`
    },
    isForToday() {
      return this.hour < new Date().getUTCHours()
    },
    fill() {
      const sortedFillEntries = Object.entries(this.$options.fillMap).sort(([a], [b]) => Number(a) < Number(b))
      const colorObject = sortedFillEntries.find(([key]) => this.percent >= key)

      return colorObject ? colorObject[1] : colors.black
    }
  },
  fillMap: {
    100: colors.red['700'],
    60: colors.orange['700'],
    40: colors.yellow['600'],
    20: colors.yellow['400'],
    5: colors.green['400'],
    0: colors.green['600']
  }
}
</script>
