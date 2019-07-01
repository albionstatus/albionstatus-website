<template>
  <rect
    v-tooltip="`${percent} percent (${minutes} minutes) outage`"
    :fill="fill"
    :x="15 * position"
    height="75"
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
    }
  },
  computed: {
    fill() {
      const fillMap = {
        100: colors.red['700'],
        60: colors.orange['700'],
        40: colors.yellow['600'],
        20: colors.yellow['400'],
        5: colors.green['400'],
        0: colors.green['600']
      }

      const colorObject = Object.entries(fillMap).sort(([a], [b]) => Number(a) < Number(b)).find(([key]) => this.percent >= key)

      return colorObject ? colorObject[1] : colors.black
    }
  }
}
</script>
