<script setup lang="ts">
import { DateTime, Duration } from 'luxon'
import { useIntervalFn } from '@vueuse/core'

const props = defineProps<{
  number: number
  endDate: string
}>()

const now = ref(DateTime.local())
const endOfSeason = ref(DateTime.fromFormat(props.endDate, 'yyyy-MM-dd').set({ minute: 59, second: 0, hour: 9 }))

const remaining = computed(() => endOfSeason.value.diff(now.value).toObject())
const finished = computed(() => now.value >= endOfSeason.value)

useIntervalFn(() => { now.value = DateTime.local() }, 10)

const formattedTimeUntilEndOfSeason = computed(() => finished.value
  ? 'Ended already'
  : Duration.fromObject(remaining.value).toFormat('dd \'days\' hh \'hours\' mm \'minutes and\' ss \'seconds\''))
</script>

<template>
  <ClientOnly>
    <div class="mt-16">
      <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div class="max-w-4xl mx-auto">
          <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-1">
            <div
              class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r"
            >
              <span
                class="order-1 text-2xl font-extrabold leading-none text-indigo-600"
              >{{ formattedTimeUntilEndOfSeason }}</span>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
