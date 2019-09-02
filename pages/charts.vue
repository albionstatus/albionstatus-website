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
    return {
      title: 'Uptime Charts'
    }
  }
}
</script>
