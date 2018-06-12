<template>
  <div class="container mx-auto p-4 text-center">
    <h1 class="my-4">Uptime charts (last 24h)</h1>
    <uptime-chart/>
  </div>
</template>

<script>
export default {
  components: {
    UptimeChart: () => import('~/components/chart/UptimeChart')
  },
  head () {
    return {
      title: 'Uptime Charts - AlbionStatus'
    }
  }
}
</script>
