<template>
  <div class="container p-4 mx-auto">
    <div class="flex flex-wrap flex-col w-full text-center mx-auto mt-2 mb-8">
      <span class="mt-2 mb-1 text-sm text-grey-dark">Advertisement</span>
      <ad ad-class="w-full mx-auto mb-2" ad-client="ca-pub-4749840658812364" ad-slot="6721996033"/>
    </div>
    <div class="container mx-auto p-4 text-center">
      <h1 class="my-4">Uptime charts (last 24h)</h1>
      <uptime-chart/>
    </div>
    <div class="flex flex-wrap flex-col w-full text-center mx-auto mb-2 mt-8">
      <ad ad-class="w-full mx-auto mb-2" ad-client="ca-pub-4749840658812364" ad-slot="6721996033"/>
      <span class="mt-2 mb-1 text-sm text-grey-dark">Advertisement</span>
    </div>
  </div>
</template>

<script>
  import UptimeChart from '../components/UptimeChart'

  export default {
    components: {UptimeChart}
  }
</script>
