<template>
  <NuxtContent :document="content" class="container mx-auto p-4 prose lg:prose-lg" />
</template>

<script>
import { useBasicContent } from '~/composables/useContent'

export default {
  setup () {
    const { content } = useBasicContent('privacy')
    return {
      content
    }
  },
  head () {
    return {
      title: 'Privacy',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
