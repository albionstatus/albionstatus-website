<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>

<script lang="ts">

import { computed, defineComponent } from '@nuxtjs/composition-api'

const styles = {
  h1: 'text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10',
  h2: 'font-medium text-gray-900',
  h3: 'text-2xl leading-5 font-medium'
}

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'h1'
    },
    look: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    return {
      classes: computed(() => props.look ? styles[props.look] ?? '' : styles[props.tag])
    }
  }
})
</script>
