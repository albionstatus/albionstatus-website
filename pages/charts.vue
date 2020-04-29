<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
      Uptime Charts
    </h1>
    <p class="pt-8">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, asperiores consequuntur dolore enim, eos
      expedita harum incidunt libero modi odit, repudiandae sunt suscipit veritatis voluptates voluptatibus? Adipisci
      autem eius iure.
      <br><br>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequatur cum dolor ea error incidunt
      maiores maxime officia placeat porro quam quibusdam, quos reprehenderit sed sunt totam vel veniam voluptatibus!
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
