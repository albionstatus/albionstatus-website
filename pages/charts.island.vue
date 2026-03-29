<script setup lang="ts">
import Heading from "./_components/Heading.vue";
import UptimeChart from "./_components/UptimeChart.vue" with { island: "load" };
import type { Props } from "./charts.server.js";

const props = defineProps<Props>();
</script>

<template>
  <div class="container mx-auto p-4">
    <Heading> Uptime Charts for Albion Online </Heading>
    <div class="py-4 prose lg:prose-lg max-w-none">
      <p>
        To find out about recent outages, past
        <a href="/daily-maintenance">maintenance periods</a>
        or possible server errors, we have created dynamic uptime charts. The current stacked bar
        chart shows the uptime of the Albion servers from the last 24 hours grouped by the hour. The
        times are displayed in server time, which is UTC. Don't forget to convert them to your local
        timezone.
      </p>
      <p>
        AlbionStatus is usually tracking the server status once every minute. In case AlbionStatus
        could not retrieve the Albion server status, e.g. because AlbionStatus itself is in
        maintenance mode, the minutes are shown as
        <em>not tracked</em> in the uptime chart below.
      </p>
    </div>
    <UptimeChart class="mt-8" :initial-data="props.initialChartData" />
  </div>
</template>
