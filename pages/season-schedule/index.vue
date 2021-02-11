<template>
  <div>
    <div class="prose">
      <h1>Current Season - Season 11</h1>
      Albion's Guild Season 11 began on <strong>Saturday, December 5 2020</strong> at 11:00 UTC and will end on
      <strong>Monday, March 1 2021</strong> 09:59 UTC.<br>
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
      <p>The reset days for seasons 11 were:</p>
      <ul>
        <li><strong>December 5, 2020</strong></li>
        <li><strong>January 2, 2021</strong></li>
        <li><strong>January 30, 2021</strong></li>
      </ul>
      <h2>Time until end of the season</h2>
      <EndOfSeasonTimer :number="11" end-date="2021-03-01" />
    </div>
  </div>
</template>
<script>

export default {
  head () {
    const title = 'Season 11 Schedule'
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
