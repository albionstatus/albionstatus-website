<script setup lang="ts">
import { ref, computed } from "vue";
import { useIntervalFn } from "@vueuse/core";
import { useClientOnly } from "../_composables/useClientOnly.js";

const props = defineProps<{
  number: number;
  endDate: string;
}>();

const mounted = useClientOnly();
const now = ref(new Date());

const endOfSeason = new Date(`${props.endDate}T09:59:00Z`);
const finished = computed(() => now.value >= endOfSeason);

useIntervalFn(() => {
  now.value = new Date();
}, 10);

const formattedRemaining = computed(() => {
  if (finished.value) return "Ended already";
  const diff = endOfSeason.getTime() - now.value.getTime();
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(days).padStart(2, "0")} days ${String(hours).padStart(2, "0")} hours ${String(minutes).padStart(2, "0")} minutes and ${String(seconds).padStart(2, "0")} seconds`;
});
</script>

<template>
  <div class="mt-16">
    <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div class="max-w-4xl mx-auto">
        <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-1">
          <div
            class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r"
          >
            <span class="order-1 text-2xl font-extrabold leading-none text-indigo-600">
              <template v-if="mounted">{{ formattedRemaining }}</template>
            </span>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
