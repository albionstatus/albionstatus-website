<template>
  <NuxtContent :document="content" class="container mx-auto p-4 prose lg:prose-lg" />
</template>

<script>

import { defineComponent, ref, useContext, useFetch, useMeta } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const content = ref({})

    const { $content } = useContext()

    useFetch(async () => {
      content.value = await $content('privacy').fetch()
    })

    const title = 'Privacy'
    useMeta({
      title,
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    })

    return {
      content
    }
  },
  head: {}
})
</script>
