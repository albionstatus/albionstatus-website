<template>
  <div class="container mx-auto p-4">
    <Heading>
      Uptime Charts for Albion Online
    </Heading>
    <NuxtContent :document="content" class="py-4 prose lg:prose-lg max-w-none" />
    <UptimeChart class="mt-8" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useBasicContent } from '~/composables/useContent'

export default defineComponent({
  setup () {
    const { content } = useBasicContent('charts')
    return {
      content
    }
  },
  head () {
    const title = 'Albion Uptime Charts'
    const metaDescription = 'See how many Albion server outage have happened in the last 24 hours in our dynamic uptime charts.'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: title
        },
        {
          hid: 'description',
          name: 'description',
          content: metaDescription
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: metaDescription
        }
      ]
    }
  }
})</script>
