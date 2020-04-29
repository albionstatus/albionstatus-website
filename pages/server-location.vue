<template>
  <FaqTwoColumn :content="$options.content">
    <template #heading>
      <h1 class="text-center text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
        All about the Albion Online server location
      </h1>
    </template>
  </FaqTwoColumn>
</template>
<script>

import FaqTwoColumn from '@/components/FaqTwoColumn'

export default {
  components: {
    FaqTwoColumn
  },
  content: [
    {
      question: 'How many Albion servers exist?',
      answer: `
        All players play on <strong>the same server instance</strong>.
        There aren't multiple servers running, not even for the different platforms the game is available on.
        That's the reason why there is no sever selection shown when creating your character.
        Albion is, similar to EVE Online, sticking to the global server concept, which means:<br>
        "<strong>One server for all players</strong>".
        <br><br>
        However, in the early days the data was hosted in two datacenters, which resulted in a better ping for players.
        But the disadvantages, including latency and inter-server disconnects, outweighed the advantages.`
    },
    {
      question: 'Does the server location negatively influences the game experience?',
      answer: `
        Generally speaking, it <strong>should not influence your game experience</strong>. 95% of the Albion Online
        players have a ping below 150, according to the developers of the game.
        Players from Australia might suffer from the worldwide highest pings but the game should be still playable for
        them.<br>
        Also, your in-game experience depends on lots of other factors. Besides your location, your own internet
        connection and your gaming hardware matters a lot as well.
        If you want to find out if you can enjoy the game, you should simply try it out. It's free to play after all.`
    },
    {
      question: 'Where is the Albion Online server located?',
      answer: `
        The server is located in <strong>Washington DC, USA</strong>. This server location was chosen in such a way that
        players from America, Europe and also Russia will have a decent ping. As Albion's combat isn't as fast paced as
        RTS games like Dota or Starcraft, players can even play the game well with "high pings" of 150.`
    },
    {
      question: 'Is there a european or oceanic server for Albion?',
      answer: `
        As explained in the previous answers, there is <strong>no european or australian/oceanic server for Albion Online</strong>.
        As long as the Albion developers will stick to the single server principle, a dedicated server for european players is not
        possible. Thus, you also can not change the server you are playing on.`
    },
    {
      question: 'How do I check my ping or latency when playing Albion Online?',
      answer: 'When you are in the game, type <code>/ping</code>. Then, the ping will be shown in the lower-right corner of the screen.'
    }
  ],
  head () {
    const title = 'About the location of the Albion Online servers'
    const metaDescription = 'Where are the Albion servers located? Is the location the cause of bad in-game experiences? How many of them actually exist? Find an answer to these question on AlbionStatus'

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
