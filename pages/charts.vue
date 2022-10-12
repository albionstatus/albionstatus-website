<template>
  <div class="container mx-auto p-4">
    <Heading>
      Uptime Charts for Albion Online
    </Heading>
    <AppContent class="py-4 prose lg:prose-lg max-w-none" />
    <UptimeChart class="mt-8" />
  </div>
</template>

<script setup lang="ts">
const title = 'Albion Uptime Charts'
const metaDescription = 'See how many Albion server outage have happened in the last 24 hours in our dynamic uptime charts.'

useHead({
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
</script>
