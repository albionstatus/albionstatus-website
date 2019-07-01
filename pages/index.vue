<template>
  <div class="container px-4 pt-0 pb-6 mx-auto">
    <server-status />
    <div class="text-center my-4 py-2">
      <nuxt-link
        class="underline text-2xl text-black"
        to="charts"
      >
        Uptime charts have arrived!
      </nuxt-link>
    </div>
    <h1 class="text-center mt-8 pt-4 text-4xl font-bold text-gray-800 mb-2">
      AlbionStatus
    </h1>
    <p class="text-lg leading-loose font-serif text-gray-800">
      AlbionStatus is your <span class="text-black">reliable</span> Albion Online server status tracker! Operating
      since
      <span class="text-black font-semibold">{{ $options.creationDate | moment('MMM Do YYYY') }}</span> (already
      <time
        :datetime="$options.creationDate"
        :title="$options.creationDate"
        class="text-black italic"
      >{{ $options.creationDate | moment('from', new Date(), true) }}
      </time>
      by now 🎉), it was the
      first Albion Online server status tracker <strong class="text-black">ever!</strong> The project was created when
      no server status page was available and Albion Online devs announced the server status changes manually.
      Additionally, there were heavy DDoS attacks against the servers. AlbionStatus was built to allow players to stay
      informed about the Albion Online server status while doing something else, like watching videos or playing
      something else. The key goal was to make refreshing the server status page and client obsolete, and I'm quite
      sure that we reached it!<br><br>
      We also have a
      <a
        class="gray-900 group hover:text-black "
        href="https://twitter.com/AlbionStatus"
        rel="noopener"
        target="_blank"
      >
        <span class="text-blue-500">Twitter</span>-bot
      </a> which you can follow to stay up to date about the server status.
      Be sure to take a look into the
      <nuxt-link
        class="font-semibold text-gray-800 hover:text-black my-2 md:my-0"
        to="faq"
      >
        <InfoIcon class="w-6 h-6 inline" style="vertical-align: sub" />
        FAQ
      </nuxt-link>
      if you haven't done that by now!
    </p>
    <h2 class="text-center mt-8 pt-4 text-3xl font-bold text-gray-800 mb-2">
      Open Source
    </h2>
    <p class="text-lg leading-loose font-serif text-gray-800">
      Also, AlbionStatus is the first open source tracker for the servers of Albion Online. If you are interested how
      the tech stack looks like, what queries we do and how we save the data, check out our
      <a
        class="text-gray-800 underline hover:text-black"
        href="https://github.com/manniL/albionstatus-website/"
        rel="noreferrer noopener"
        target="_blank"
      >three</a>
      <a
        class="text-gray-800 underline hover:text-black"
        href="https://github.com/manniL/albionstatus-microservice/"
        rel="noreferrer noopener"
        target="_blank"
      >GitHub</a>
      <a
        class="text-gray-800 underline hover:text-black"
        href="https://github.com/manniL/albionstatus-scraper-bot/"
        rel="noreferrer noopener"
        target="_blank"
      >repos</a>! Thanks a lot to all contributors who helped building AlbionStatus.
    </p>
    <h2 class="text-center mt-8 pt-4 text-3xl font-bold text-gray-800 mb-2">
      What's next?
    </h2>
    <p class="text-lg leading-loose font-serif text-gray-800">
      Oh, great question! There are several more features planned:
    </p>
    <ul class="text-lg leading-loose font-serif text-gray-800 list-disc pl-12 mb-4">
      <li>Uptime charts 📊 (partially done!)</li>
      <li>Server status widget 🔌 (coming soon)</li>
      <li>CLI/Bot support 🤖</li>
      <li><s>Push notifications on server status change 👈🏼</s> Done!</li>
      <li>More sources of truth for the server status ➕</li>
    </ul>
    <p class="text-lg leading-loose font-serif text-gray-800">
      If you are interested in contributing towards the project, just do it 😊. Take an issue (or open one) to
      signal that you want to work on it or submit a PR if you are on it!
    </p>
  </div>
</template>

<script>
import ServerStatus from '~/components/ServerStatus'

export default {
  name: 'Index',
  components: {
    ServerStatus,
    InfoIcon: () => import('~/components/icons/info.svg')
  },
  creationDate: '2017-07-29T08:09:11.0Z'
}
</script>
