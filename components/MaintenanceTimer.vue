<template>
  <ClientOnly>
    <div class="mt-16">
      <Heading id="timer" tag="h2" look="h1">
        Maintenance timer
      </Heading>
      <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div class="max-w-4xl mx-auto">
          <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
            <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
              <dt id="start-next-maintenance" class="order-2 mt-5 text-lg leading-6 font-medium text-gray-500">
                Start of the next scheduled maintenance
              </dt>
              <dd class="order-1 text-2xl font-extrabold leading-none" aria-describedby="start-next-maintenance">
                {{ formattedStartOfNextMaintenance }}
              </dd>
            </div>
            <div
              class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r"
            >
              <dt id="end-next-maintenance" class="order-2 text-lg leading-6 font-medium text-gray-500 mt-5">
                Usual end of the next scheduled maintenance
              </dt>
              <dd class="order-1 text-2xl font-extrabold leading-none text-indigo-600" aria-describedby="end-next-maintenance">
                {{ formattedEndOfNextMaintenance }}
              </dd>
            </div>
            <div
              class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r"
            >
              <dt id="time-until-next-maintenance" class="order-2 text-lg leading-6 font-medium text-gray-500 mt-5">
                Time until the next scheduled maintenance
              </dt>
              <dd class="order-1 text-2xl font-extrabold leading-none text-indigo-600" aria-describedby="time-until-next-maintenance">
                {{ formattedTimeUntilMaintenance }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import { DateTime, Duration } from 'luxon'
import { ref, computed, watchEffect } from '@nuxtjs/composition-api'
import { useInterval } from '~/composables/useInterval'

export default {
  setup () {
    const now = ref(DateTime.local())

    const startOfMaintenance = ref(DateTime.utc().set({ minutes: 0, seconds: 0, hours: 10 }))
    const endOfMaintenance = ref(DateTime.utc().set({ minutes: 30, seconds: 0, hours: 10 }))

    const remaining = computed(() => startOfMaintenance.value.diff(now.value).toObject())
    const finished = computed(() => now.value >= startOfMaintenance.value)

    const updateMaintenanceDate = () => {
      startOfMaintenance.value = startOfMaintenance.value.plus({ days: 1 })
      endOfMaintenance.value = endOfMaintenance.value.plus({ days: 1 })
    }

    useInterval(() => { now.value = DateTime.local() }, 10)
    watchEffect(() => {
      if (finished.value) {
        updateMaintenanceDate()
      }
    })

    const formattedStartOfNextMaintenance = computed(() => startOfMaintenance.value.toLocaleString(DateTime.DATETIME_FULL))
    const formattedEndOfNextMaintenance = computed(() => endOfMaintenance.value.toLocaleString(DateTime.DATETIME_FULL))
    const formattedTimeUntilMaintenance = computed(() => Duration.fromObject(remaining.value).toFormat('hh \'hours\' mm \'minutes and\' ss \'seconds\''))

    return {
      formattedEndOfNextMaintenance,
      formattedStartOfNextMaintenance,
      formattedTimeUntilMaintenance
    }
  }
}
</script>
