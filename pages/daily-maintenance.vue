<template>
  <FaqTwoColumn :content="content">
    <template #heading>
      <Heading>
        Daily Maintenance of the Albion Online Servers
      </Heading>
    </template>
    <template #intro>
      <p class="pt-8">
        The daily maintenance is an important part of Albion Online. Every player should be aware of it.
        Nothing is more annoying then trying to play the game and see that the maintenance is ongoing.
        Luckily, our
        <NuxtLink class="underline hover:no-underline inline-block text-gray-800" to="/">
          server status tracker
        </NuxtLink>
        will tell you when the servers are back online.
        <br><br>
        Below, you'll find information regarding the duration, timing and purpose of the daily server maintenance.
        As a bonus, there is a <a class="underline hover:no-underline inline-block text-gray-800" href="#timer">timer</a>
        showing you the time until the next maintenance based on the usual schedule.
      </p>
    </template>
    <template #outro>
      <LazyMaintenanceTimer />
    </template>
  </FaqTwoColumn>
</template>

<script setup lang="ts">
const
  content = [
    {
      question: 'How long does the server maintenance usually last?',
      answer: `
      The maintenance of the Albion servers lasts an <strong>average of 30 to 60 minutes per day</strong>. During
      this time, no player can access the servers as they are shut down. However, the time can be extended by the
      developers. This is often the case after large content updates or patches.`
    },
    {
      question: 'Why is the daily server maintenance needed at all?',
      answer: `
      The world of Albion is running on a single server, as explained on the
      <a class="underline hover:no-underline inline-block text-gray-800 font-bold" href="/server-location/">
        server location
      </a>
      information page. Also, it is a large, fast-living and persisting world. To update the game, fixing bugs or simply
      re-rolling the resource allocation, there is no other option than taking the game down for a couple of minutes.
      This also frees some server resources that'd pile up otherwise.
    `
    },
    {
      question: 'When does the Albion Online daily maintenance happen?',
      answer: `
      The maintenance is taking place from <strong>10am to 11am UTC</strong> every day.
      The total duration can vary though as explained above.`
    },
    {
      question: 'What happens during the maintenance?',
      answer: `
      During the daily server maintenance, there are a couple of technical tasks to fulfill.
      First of all, a world backup is created automatically to have a rollback available for critical situations.
      The downtime can also be used to upstream server-side updates or fixes, when there are any.
      Also, changes on the server software and hardware have to be done in that time. This includes tasks like adding
      additional machines, updating the server's operating system or changing the routing configurations.
      <br><br>
      The daily maintenance plays also a key role for the world ecosystem in Albion Online.
      It will cause territory changes on the map and also shuffle the resource node allocation. That means that ores, wood but also
      chests are changing their location after the downtime and will respawn somewhere with full capacities.
      `
    }
  ]
const title = 'Daily Maintenance of the Albion Online Servers | AlbionStatus'
const metaDescription = 'Find out about the daily server maintenance for Albion Online. When does it happen? How long does it take? And what will be done during it?'

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
