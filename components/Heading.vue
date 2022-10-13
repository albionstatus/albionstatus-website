<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
type HeadingTag = 'h1' | 'h2' | 'h3'

const styles = {
  h1: 'text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10',
  h2: 'font-medium text-gray-900',
  h3: 'text-2xl leading-5 font-medium'
}

const props = withDefaults(defineProps<{
  tag?: HeadingTag,
  look?: string
}>(), { tag: 'h1' })

const classes = computed(() => styles?.[props.look ?? props.tag] ?? '')
</script>
