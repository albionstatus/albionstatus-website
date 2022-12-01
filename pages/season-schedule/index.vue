<script setup lang="ts">
const title = 'Season 12 Schedule | AlbionStatus'
const metaDescription = 'Read more about the schedule of the current Albion Online season, reset days and territory claiming'

useHead({
  title,
  meta: [
    {
      hid: 'og:title',
      name: 'og:title',
      content: title,
    },
    {
      hid: 'description',
      name: 'description',
      content: metaDescription,
    },
    {
      hid: 'og:description',
      name: 'og:description',
      content: metaDescription,
    },
  ],
})
</script>

<template>
  <div>
    <div class="prose">
      <h1>Current Season - Season 17</h1>
      Albion's Guild Season 17 begins on <strong>Saturday, September 17 2022</strong> at 11:00 UTC and will end on
      <strong>Monday, December 05 2022</strong> 09:59 UTC.<br>
      <h2>Reset Days / Invasion Days</h2>
      <p>
        On so called <em>Invasion Days</em> &ndash; also referred to as Reset Days &ndash; claimed guild
        territories will be reset and can be claimed again during specific times: Either 18:00 UTC or 01:00 UTC. This
        depends on the <em>primetime</em> of the territory.
      </p>
      <p>
        Territories with a primetime starting between 12:00 and 21:00 UTC will be reset at 18:00 UTC on the reset day while territories
        with a primetime between 22:00 and 5:00 UTC will become available at 01:00 UTC on the following day. The reset times create a balance
        between EU and NA core play times.
      </p>
      <p>The reset days for seasons 17 are:</p>
      <ul>
        <li><strong>September 17, 2022</strong></li>
        <li><strong>October 10, 2022</strong></li>
        <li><strong>November 11, 2022</strong></li>
      </ul>
      <h2>Time until end of the season</h2>
      <EndOfSeasonTimer :number="17" end-date="2022-12-05" />
    </div>
  </div>
</template>
