<template>
  <ClientOnly>
    <div class="mt-16">
      <h2 id="timer" class="text-xl leading-9 font-bold text-gray-900 sm:text-2xl sm:leading-10">
        Maintenance timer
      </h2>
      <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div class="max-w-4xl mx-auto">
          <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
            <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
              <dt id="item-1" class="order-2 mt-5 text-lg leading-6 font-medium text-gray-500">
                Start of the next scheduled maintenance
              </dt>
              <dd class="order-1 text-2xl font-extrabold leading-none" aria-describedby="item-1">
                {{ formattedStartOfNextMaintenance }}
              </dd>
            </div>
            <div class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
              <dt class="order-2 text-lg leading-6 font-medium text-gray-500 mt-5">
                Usual end of the next scheduled maintenance
              </dt>
              <dd class="order-1 text-2xl font-extrabold leading-none text-indigo-600">
                {{ formattedEndOfNextMaintenance }}
              </dd>
            </div>
            <div class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
              <dt class="order-2 text-lg leading-6 font-medium text-gray-500 mt-5">
                Time until the next scheduled maintenance
              </dt>
              <dd class="order-1 text-2xl font-extrabold leading-none text-indigo-600">
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

export default {
  data () {
    return {
      start: DateTime.local(),
      now: DateTime.local(),
      startOfMaintenance: DateTime.utc().set({ minutes: 0, seconds: 0, hours: 10 }),
      endOfMaintenance: DateTime.utc().set({ minutes: 30, seconds: 0, hours: 10 })
    }
  },
  computed: {
    formattedStartOfNextMaintenance () {
      return this.startOfMaintenance.toLocaleString(DateTime.DATETIME_FULL)
    },
    formattedEndOfNextMaintenance () {
      return this.endOfMaintenance.toLocaleString(DateTime.DATETIME_FULL)
    },
    formattedTimeUntilMaintenance () {
      return Duration.fromObject(this.remaining).toFormat('hh \'hours\' mm \'minutes and\' ss \'seconds\'')
    },
    total () {
      return this.startOfMaintenance.diff(this.start).toObject()
    },
    remaining () {
      return this.startOfMaintenance.diff(this.now).toObject()
    },
    elapsed () {
      return this.now.diff(this.start).toObject()
    },
    percent () {
      return this.elapsed.milliseconds / this.total.milliseconds * 100
    },
    finished () {
      return this.now >= this.startOfMaintenance
    }
  },
  watch: {
    now () {
      if (this.finished) {
        this.updateMaintenanceDate()
      }
    }
  },
  mounted () {
    const handle = setInterval(() => {
      this.now = DateTime.local()
    }, 10)

    this.$once('hook:beforeDestroy', () => {
      clearInterval(handle)
    })
  },
  methods: {
    updateMaintenanceDate () {
      this.startOfMaintenance = this.startOfMaintenance.plus({ days: 1 })
      this.endOfMaintenance = this.endOfMaintenance.plus({ days: 1 })
    }
  }
}
</script>
