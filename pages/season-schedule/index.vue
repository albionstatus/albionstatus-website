<template>
  <div>
    <div class="prose">
      <h1>Current Season - Season 12</h1>
      Albion's Guild Season 12 begins on <strong>Saturday, March 13 2020</strong> at 11:00 UTC and will end on
      <strong>Monday, June 7 2021</strong> 09:59 UTC.<br>
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
      <p>The reset days for seasons 12 are:</p>
      <ul>
        <li><strong>March 13, 2021</strong></li>
        <li><strong>April 10, 2021</strong></li>
        <li><strong>May 8, 2021</strong></li>
      </ul>
      <h2>Time until end of the season</h2>
      <EndOfSeasonTimer :number="12" end-date="2021-06-07" />
    </div>
  </div>
</template>
<script lang="ts">

export default {
  head () {
    const title = 'Season 12 Schedule'
    const metaDescription = 'Read more about the schedule of the current Albion Online season, reset days and territory claiming'

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
