<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from '@nuxtjs/composition-api'

type HeadingTag = 'h1' | 'h2' | 'h3'

const styles: Record<string, string> = {
  h1: 'text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10',
  h2: 'font-medium text-gray-900',
  h3: 'text-2xl leading-5 font-medium'
}

const props = withDefaults(defineProps<{
  tag: HeadingTag,
  look: string
}>(), { tag: 'h1', look: '' })

const classes = computed(() => props.look ? styles[props.look] ?? '' : styles[props.tag])
</script>
