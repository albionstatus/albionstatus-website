<script setup lang="ts">
type HeadingTag = 'h1' | 'h2' | 'h3'

const props = withDefaults(defineProps<{
  tag?: HeadingTag
  look?: HeadingTag
  content?: string
}>(), { tag: 'h1' })

const styles: Record<HeadingTag, string> = {
  h1: 'text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10',
  h2: 'font-medium text-gray-900',
  h3: 'text-2xl leading-5 font-medium',
}

const classes = computed(() => styles?.[props.look ?? props.tag] ?? '')
</script>

<template>
  <component :is="tag" :class="classes">
    <slot>
      {{ content }}
    </slot>
  </component>
</template>
