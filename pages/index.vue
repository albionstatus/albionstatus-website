<template>
  <div class="container px-4 pt-0 pb-6 mx-auto">
    <div class="flex-1 min-w-0">
      <h1 class="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
        AlbionStatus - Your Server Status tracker
      </h1>
    </div>
    <ServerStatus />
    <div class="text-lg pt-4 lg:pt-8 leading-loose text-gray-800 space-y-6">
      <p>
        AlbionStatus is your <span class="text-black">reliable</span> Albion Online server status tracker! Operating
        since <span class="text-black font-semibold">{{ $options.luxonDate }}</span> it was the
        first Albion Online server status tracker ever! Want to know if Albion is
        down? We got you covered.
      </p>
      <p>
        The project was created when no server status page was available and the Albion Online
        developers announced the server status changes manually. Additionally, there were heavy DDoS attacks taking down
        the servers every now and then. Nowadays, the most common downtime source is the
        <NuxtLink class="underline hover:no-underline inline-block text-black my-2 md:my-0" to="/daily-maintenance/">
          daily maintenance
        </NuxtLink>.
      </p>
      <p>
        AlbionStatus was built to allow players to stay informed about the Albion Online server status while pursuing other
        activities, like watching videos or playing other MMORPGs. The key goal was to make
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
        <NuxtLink
          class="underline hover:no-underline inline-block text-gray-800 hover:text-black my-2 md:my-0"
          to="/faq/"
        >
          FAQ
        </NuxtLink>
        if you haven't done that by now!
      </p>
    </div>
    <h2 class="mt-8 pt-4 text-3xl font-bold text-gray-800 mb-2">
      Open Source
    </h2>
    <p class="text-lg leading-loose text-gray-800">
      Also, AlbionStatus is the first open source tracker for the servers of Albion Online. If you are interested how
      the tech stack looks like, what queries we do and how we save the data, check out our
      <a
        class="text-gray-800 underline hover:no-underline hover:text-black"
        href="https://github.com/manniL/albionstatus-website/"
        rel="noreferrer noopener"
        target="_blank"
      >GitHub</a>
      <a
        class="text-gray-800 underline hover:no-underline hover:text-black"
        href="https://github.com/manniL/albionstatus-backend/"
        rel="noreferrer noopener"
        target="_blank"
      >repositories</a>! Thanks a lot to all contributors who helped building AlbionStatus.
    </p>
    <h2 class="mt-8 pt-4 text-3xl font-bold text-gray-800 mb-2">
      What's next?
    </h2>
    <p class="text-lg leading-loose text-gray-800">
      Oh, great question! There are several more features planned:
    </p>
    <ul class="text-lg leading-loose text-gray-800 list-disc pl-12 mb-4">
      <li>
        <NuxtLink to="/charts/" class="inline-block underline hover:no-underline">
          Uptime charts 📊
        </NuxtLink> (partially done!)
      </li>
      <li>Server status widget 🔌</li>
      <li>CLI/Bot support 🤖</li>
    </ul>
    <p class="text-lg leading-loose text-gray-800">
      If you are interested in contributing towards the project, just do it 😊. Take an issue (or open one) to
      signal that you want to work on it or submit a PR if you are on it!
    </p>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import ServerStatus from '~/components/ServerStatus'
import { DATE_OF_CREATION } from '~/shared/constants'

export default {
  components: {
    ServerStatus
  },
  luxonDate: DateTime.fromISO(DATE_OF_CREATION).toLocaleString(DateTime.DATE_FULL)
}
</script>
