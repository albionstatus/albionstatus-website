<script setup lang="ts">
const content = [
  {
    question: 'How many Albion servers exist?',
    answer: `
        All players play on <span class="font-medium">the same server instance</span>.
        There aren't multiple servers running, not even for the different platforms the game is available on.
        That's the reason why there is no sever selection shown when creating your character.
        Albion is, similar to EVE Online, sticking to the global server concept, which means:<br>
        "<span class="font-medium">One server for all players</span>".
        <br><br>
        However, in the early days the data was hosted in two datacenters, which resulted in a better ping for players.
        But the disadvantages, including latency and inter-server disconnects, outweighed the advantages.`,
  },
  {
    question: 'Does the server location negatively influence the game experience?',
    answer: `
        Generally speaking, it <span class="font-medium">should not influence your game experience</span>.
        95% of the Albion Online players have a ping below 150, according to the developers of the game.
        Players from Australia might suffer from the worldwide highest pings but the game should be still playable for
        them.<br>
        Also, your in-game experience depends on lots of other factors. Besides your location, your own internet
        connection and your gaming hardware matters a lot as well.
        If you want to find out if you can enjoy the game, you should simply try it out. It's free to play after all.`,
  },
  {
    question: 'Where is the Albion Online server located?',
    answer: `
        The server of "Albion West" is located in <span class="font-medium">Washington DC, USA</span>. This server location was chosen in such a way that
        players from America, Europe and also Russia will have a decent ping. As Albion's combat isn't as fast paced as
        RTS games like Dota or Starcraft, players can even play the game well with "high pings" of 150.
        An "Albion East" server aimed for players from Oceania and Asia was announced recently. The location of the Albion East server will be Singapore.`,
  },
  {
    question: 'Are there EU or OCE servers available for Albion?',
    answer: `
        As explained in the previous answers, there is <span class="font-medium">no european or australian/oceanic server for Albion Online yet</span>.
        The "Albion East" closed beta will launch on the 20th of February and will be publicly available on March 20th 2023.
        There is no european server planned though.`,
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
