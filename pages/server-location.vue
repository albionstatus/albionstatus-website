<script setup lang="ts">
const content = [
  {
    question: 'How many Albion servers exist?',
    answer: `
        There are currently three servers:
        - Albion Americas (Washington DC)
        - Albion Asia (Singapore)
        - Albion Europe (Amsterdam)
        Each server is seperate so players can play on the server nearest to them (lowest ping),
        but a player can play on either of these three servers. On the character selection
        screen, you can chose which server you wish to play on and the ping is shown behind
        the server name. The lower the ping, the better the connection.`,
  },
  {
    question: 'Does the server location negatively influence the game experience?',
    answer: `
        Generally speaking, it <span class="font-medium">should not influence your game experience</span>.
        95% of the Albion Online players have a ping below 150, according to the developers of the game.
        Still, it can't hurt to choose the server with the lowest ping.
        Players from Australia might suffer from the worldwide highest pings but the game should be still playable for
        them.<br>
        Also, your in-game experience depends on lots of other factors. Besides your location, your own internet
        connection and your gaming hardware matters a lot as well.
        If you want to find out if you can enjoy the game, you should simply try it out. It's free to play after all.`,
  },
  {
    question: 'Where is the Albion Online server located?',
    answer: `
        The server of "Albion Americas" is located in <span class="font-medium">Washington DC, USA</span>.
        The server of "Albion Asia" is located in <span class="font-medium">Singapore, Singapore</span>.
        The server of "Albion Europe" is located in <span class="font-medium">Amsterdam, the Netherlands</span>.`,
  },
  {
    question: 'How do I see my ping or latency when playing Albion Online?',
    answer: 'When you are in the game, type <code class="bg-gray-100 px-1">/ping</code>. Then, the ping will be shown in the lower-right corner of the screen.',
  },
]
const title = 'About the location of the Albion Online servers | AlbionStatus'
const metaDescription = 'Where are the Albion servers located? Is the location the cause of bad in-game experiences? How many of them actually exist? Find an answer to these question on AlbionStatus'

useHead({
  title,
  meta: [
    {
      name: 'og:title',
      content: title,
    },
    {
      name: 'description',
      content: metaDescription,
    },
    {
      name: 'og:description',
      content: metaDescription,
    },
  ],
})
</script>

<template>
  <FaqTwoColumn :content="content">
    <template #heading>
      <Heading>
        All about the Albion Online server location
      </Heading>
    </template>
    <template #intro>
      <p class="pt-8">
        <span class="italic">Most people</span> are asking themselves where the Albion Online servers are
        located and if they are the cause for possible lag spikes, rubberbanding or other bad online experiences.
        Also it isn't clear to many Albion players how many server instances or shards are actually available and how to
        switch between them.
        <br><br>
        In the following overview, you will find out!
      </p>
    </template>
  </FaqTwoColumn>
</template>
