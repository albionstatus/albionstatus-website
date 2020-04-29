<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
      Uptime Charts for Albion Online
    </h1>
    <p class="pt-8">
      To find out about recent outages, past
      <NuxtLink class="underline hover:no-underline inline-block text-gray-800" to="/daily-maintenance/">
        maintenance periods
      </NuxtLink> or possible server errors, we have created dynamic uptime charts.
      The current stacked bar chart shows the uptime of the Albion servers from the last 24 hours grouped by the hour.
      The times are displayed in server time, which is UTC. Don't forget to convert them to your local timezone.
      <br><br>
      AlbionStatus is usually tracking the server status once every minute. In case AlbionStatus could not retrieve the
      Albion server status, e.g. because AlbionStatus itself is in maintenance mode, the minutes are shown as
      <em>not tracked</em> in the uptime chart below.
    </p>
    <UptimeChart class="mt-8" />
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
