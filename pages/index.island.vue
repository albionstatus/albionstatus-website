<script setup lang="ts">
import { format } from "date-fns";
import Heading from "./_components/Heading.vue";
import ServerStatus from "./_components/ServerStatus.vue" with { island: "load" };
import { DATE_OF_CREATION } from "./_data/constants.js";
import type { Props } from "./index.server.js";

const props = defineProps<Props>();
const creationDate = format(new Date(DATE_OF_CREATION), "MMMM d, yyyy");
</script>

<template>
  <div class="px-4 pt-0 pb-6 mx-auto">
    <div class="flex-1 min-w-0">
      <Heading>AlbionStatus - Your Server Status tracker</Heading>
    </div>
    <ServerStatus
      :initial-was="props.statusWas"
      :initial-sgp="props.statusSgp"
      :initial-ams="props.statusAms"
    />
    <div class="prose lg:prose-lg mt-8 w-full max-w-none">
      <p>
        AlbionStatus is your reliable Albion Online server status tracker! Operating since
        <strong>{{ creationDate }}</strong> it was the first Albion Online server status tracker
        ever! Want to know if Albion is down? We got you covered.
      </p>
      <p>
        The project has been created when no server status page was available, and the Albion Online
        developers announced the server status changes manually. Additionally, there were heavy DDoS
        attacks taking down the servers every now and then. Nowadays, the most common downtime
        source is the
        <a href="/daily-maintenance">daily maintenance</a>.
      </p>
      <p>
        AlbionStatus was built to allow players to stay informed about the Albion Online server
        status while pursuing other activities, like watching videos or playing other MMORPGs. The
        key goal was to make refreshing the server status page and client obsolete, and I'm quite
        sure we've reached it!
      </p>
      <p>
        We also have a
        <a
          href="https://twitter.com/AlbionStatus"
          target="_blank"
          rel="noopener"
          class="text-blue-500"
          >Twitter-bot</a
        >
        which you can follow to stay up to date about the server status. Be sure to take a look into
        the FAQ if you haven't done that by now!
      </p>
      <h2>Open Source</h2>
      <p>
        Also, AlbionStatus is the first open source tracker for the servers of Albion Online. If you
        are interested how the tech stack looks like, what queries we do and how we save the data,
        check out our
        <a
          href="https://github.com/albionstatus/albionstatus-website/"
          target="_blank"
          rel="noopener"
          >GitHub</a
        >&nbsp;<a
          href="https://github.com/albionstatus/albionstatus-backend/"
          target="_blank"
          rel="noopener"
          >repositories</a
        >! Thanks a lot to all contributors who helped to build AlbionStatus.
      </p>
      <h2>What's next?</h2>
      <p>Oh, great question! There are several more features planned:</p>
      <ul>
        <li><a href="/charts">Uptime charts</a> (partially done!)</li>
        <li>Server status widget</li>
        <li>CLI/Bot support</li>
      </ul>
      <p>
        If you are interested in contributing towards the project, just do it. Take an issue (or
        open one) to signal that you want to work on it or submit a PR if you are on it!
      </p>
    </div>
  </div>
</template>
