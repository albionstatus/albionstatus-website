<template>
  <div class="container mx-auto p-4 text-center">
    <h1 class="my-4 text-3xl font-bold">
      Uptime charts (last 24h in UTC time)
    </h1>
    <uptime-chart />
  </div>
</template>

<script>
import UptimeChart from '~/components/chart/UptimeChart'
export default {
  components: {
    UptimeChart
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
}
</script>
