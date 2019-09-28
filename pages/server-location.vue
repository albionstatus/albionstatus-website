<template>
  <div class="container p-4 mx-auto">
    <h1 class="text-center text-4xl font-bold">
      All about the Albion Online server location
    </h1>
    <p class="pt-8">
      <span class="text-xl">Most people</span> are asking themselves where the Albion Online servers are located and if
      they are the cause for possible lag spikes, rubberbanding or other bad online experiences.
      Also it isn't clear to many Albion players how many server instances or
      shards are actually available and how to switch between them.
      <br><br>
      In the following overview, you will find out!
    </p>
    <h2 class="text-2xl pt-8">
      How many Albion servers exist?
    </h2>
    <p class="mt-4 max-w-4xl">
      All players play on <strong>the same server instance</strong>. There aren't multiple servers running, which is
      why there isn't a sever selection when creating your character.
      Albion is, similar to EVE Online, sticking to the global server concept, which means:<br>
      "<strong>One server for all players</strong>".
    </p>
    <h2 class="text-2xl pt-8">
      Where is the Albion Online server located?
    </h2>
    <p class="mt-4 max-w-4xl">
      The server is located in <strong>Washington DC, USA</strong>. This server location was chosen in such a way that
      players from
      America, Europe and also Russia will have a decent ping. As Albion's combat isn't as fast paced as RTS games like
      Dota or Starcraft,
      players can even play the game well with "high pings" of 150.
    </p>
    <h2 class="text-2xl pt-8">
      Does the server location negatively influences the game experience?
    </h2>
    <p class="mt-4 max-w-4xl">
      Generally speaking, it <strong>should not influence your game experience</strong>. 95% of the Albion Online
      players have a ping below 150, according to the developers of the game.
      Players from Australia might suffer from the worldwide highest pings but the game should be still playable for
      them.<br>
      Also, your in-game experience depends on lots of other factors. Besides your location, your own internet
      connection and your gaming hardware matters a lot as well.
      If you want to find out if you can enjoy the game, you should simply try it out. It's free to play after all.
    </p>
  </div>
</template>
<script>
export default {
  head () {
    const title = 'About the location of the Albion Online servers'
    const metaDescription = `Where are the Albion servers located? Is the location the cause of bad in-game experiences? How many of them actually exist? Find an answer to these question on AlbionStatus`
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