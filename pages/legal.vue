<template>
  <NuxtContent :document="content" class="container mx-auto p-4 prose lg:prose-lg" />
</template>

<script lang="ts">
import { useBasicContent } from '~/composables/useContent'

export default {
  setup () {
    const { content } = useBasicContent('legal')
    return {
      content
    }
  },
  head () {
    return {
      title: 'Legal',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
