<template>
  <div class="container px-4 pt-0 pb-6 mx-auto">
    <div class="flex-1 min-w-0">
      <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
        AlbionStatus - Your Server Status tracker
      </h1>
    </div>
    <ServerStatus />
    <p class="text-lg pt-4 lg:pt-8 leading-loose font-serif text-gray-800">
      AlbionStatus is your <span class="text-black">reliable</span> Albion Online server status tracker! Operating
      since
      <span class="text-black font-semibold">{{ $options.luxonDate }}</span> (already
      <span
        :title="$options.creationDate"
        class="text-black italic"
      >{{ $options.operationDuration }}</span>
      by now 🎉), it was the
      first Albion Online server status tracker <strong class="text-black">ever!</strong> Want to know if Albion is
      down? We got you covered. The project was created when no server status page was available and the Albion Online
      developers announced the server status changes manually. Additionally, there were heavy DDoS attacks taking down
      the servers every now and then. Nowadays, the most common downtime source is the <nuxt-link
        class="underline hover:no-underline inline-block text-black my-2 md:my-0"
        to="/daily-maintenance/"
      >
        daily maintenance
      </nuxt-link>.
      AlbionStatus was built to allow players to stay informed about the Albion Online server status while doing
      something else, like watching videos or playing something else. The key goal was to make
      refreshing the server status page and client obsolete, and I'm quite sure that we've reached it!<br><br>
      We also have a
      <a
        class="gray-900 group hover:text-black hover:no-underline underline inline-block"
        href="https://twitter.com/AlbionStatus"
        rel="noopener"
        target="_blank"
      >
        <span class="text-blue-500">Twitter</span>-bot
      </a> which you can follow to stay up to date about the server status.
      Be sure to take a look into the
      <nuxt-link
        class="font-semibold underline hover:no-underline inline-block text-gray-800 hover:text-black my-2 md:my-0"
        to="/faq/"
      >
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
        class="text-gray-800 underline hover:no-underline hover:text-black"
        href="https://github.com/manniL/albionstatus-website/"
        rel="noreferrer noopener"
        target="_blank"
      >three</a>
      <a
        class="text-gray-800 underline hover:no-underline hover:text-black"
        href="https://github.com/manniL/albionstatus-microservice/"
        rel="noreferrer noopener"
        target="_blank"
      >GitHub</a>
      <a
        class="text-gray-800 underline hover:no-underline hover:text-black"
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
      <li><s>More sources of truth for the server status ➕</s> No more sources available.</li>
    </ul>
    <p class="text-lg leading-loose font-serif text-gray-800">
      If you are interested in contributing towards the project, just do it 😊. Take an issue (or open one) to
      signal that you want to work on it or submit a PR if you are on it!
    </p>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import ServerStatus from '~/components/ServerStatus'

const DATE_OF_CREATION = '2017-07-29T08:09:11.0Z'

const duration = DateTime.local().diff(DateTime.fromISO(DATE_OF_CREATION), ['years', 'months', 'days', 'hours'])
export default {
  components: {
    ServerStatus
  },
  creationDate: DATE_OF_CREATION,
  luxonDate: DateTime.fromISO(DATE_OF_CREATION).toLocaleString(DateTime.DATE_FULL),
  operationDuration: `${duration.years} years, ${duration.months} months and ${duration.days} days`
}
</script>
