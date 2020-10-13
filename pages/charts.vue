<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
      Uptime Charts for Albion Online
    </h1>
    <NuxtContent :document="content" class="py-4 prose lg:prose-lg max-w-none" />
    <UptimeChart class="mt-8" />
  </div>
</template>

<script>
import { useContext, useFetch, ref, useMeta, defineComponent } from '@nuxtjs/composition-api'
import UptimeChart from '~/components/chart/UptimeChart'

export default defineComponent({
  components: {
    UptimeChart
  },
  setup () {
    const content = ref({})

    const { $content } = useContext()

    useFetch(async () => {
      content.value = await $content('charts').fetch()
    })

    const title = 'Albion Uptime Charts'
    const metaDescription = 'See how many Albion server outage have happened in the last 24 hours in our dynamic uptime charts.'
    useMeta({
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
    })

    return {
      content
    }
  },
  head: {}
})
</script>
