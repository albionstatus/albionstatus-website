<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useIntervalFn } from "@vueuse/core";
import Heading from "./Heading.vue";
import { useClientOnly } from "../_composables/useClientOnly.js";

const mounted = useClientOnly();
const now = ref(new Date());

function getNextMaintenanceStart(): Date {
  const d = new Date();
  d.setUTCHours(10, 0, 0, 0);
  if (d <= new Date()) d.setUTCDate(d.getUTCDate() + 1);
  return d;
}

function getNextMaintenanceEnd(): Date {
  const d = new Date();
  d.setUTCHours(10, 30, 0, 0);
  if (d <= new Date()) d.setUTCDate(d.getUTCDate() + 1);
  return d;
}

const startOfMaintenance = ref(getNextMaintenanceStart());
const endOfMaintenance = ref(getNextMaintenanceEnd());

useIntervalFn(() => {
  now.value = new Date();
}, 10);

watchEffect(() => {
  if (now.value >= startOfMaintenance.value) {
    startOfMaintenance.value = getNextMaintenanceStart();
    endOfMaintenance.value = getNextMaintenanceEnd();
  }
});

const formattedStart = computed(() =>
  startOfMaintenance.value.toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "long",
  }),
);

const formattedEnd = computed(() =>
  endOfMaintenance.value.toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "long",
  }),
);

const formattedRemaining = computed(() => {
  const diff = startOfMaintenance.value.getTime() - now.value.getTime();
  if (diff <= 0) return "00 hours 00 minutes and 00 seconds";
  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")} hours ${String(minutes).padStart(2, "0")} minutes and ${String(seconds).padStart(2, "0")} seconds`;
});
</script>

<template>
  <div class="mt-16">
    <Heading id="timer" tag="h2" look="h1"> Maintenance timer </Heading>
    <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div class="max-w-4xl mx-auto">
        <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
          <div
            class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r"
          >
            <dt
              id="start-next-maintenance"
              class="order-2 mt-5 text-lg leading-6 font-medium text-gray-500"
            >
              Start of the next scheduled maintenance
            </dt>
            <dd
              class="order-1 text-2xl font-extrabold leading-none"
              aria-describedby="start-next-maintenance"
            >
              <template v-if="mounted">{{ formattedStart }}</template>
            </dd>
          </div>
          <div
            class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r"
          >
            <dt
              id="end-next-maintenance"
              class="order-2 text-lg leading-6 font-medium text-gray-500 mt-5"
            >
              Usual end of the next scheduled maintenance
            </dt>
            <dd
              class="order-1 text-2xl font-extrabold leading-none text-indigo-600"
              aria-describedby="end-next-maintenance"
            >
              <template v-if="mounted">{{ formattedEnd }}</template>
            </dd>
          </div>
          <div
            class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r"
          >
            <dt
              id="time-until-next-maintenance"
              class="order-2 text-lg leading-6 font-medium text-gray-500 mt-5"
            >
              Time until the next scheduled maintenance
            </dt>
            <dd
              class="order-1 text-2xl font-extrabold leading-none text-indigo-600"
              aria-describedby="time-until-next-maintenance"
            >
              <template v-if="mounted">{{ formattedRemaining }}</template>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
