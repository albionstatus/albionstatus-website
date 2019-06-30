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
import colors from '~/tailwind/colors.json'

export default {
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
        100: colors.red,
        60: colors['orange-dark'],
        40: colors['yellow-dark'],
        20: colors.yellow,
        5: colors['green-light'],
        0: colors['green-dark']
      }
      const colorObject = Object.entries(fillMap).sort(([a], [b]) => Number(a) < Number(b)).find(([key]) => this.percent >= key)

      return colorObject ? colorObject[1] : colors.black
    }
  }
}
</script>
