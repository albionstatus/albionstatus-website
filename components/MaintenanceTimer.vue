<template>
  <div>
    <h3 id="timer" class="text-xl">
      Maintenance timer
    </h3>
    <dl class="mt-4">
      <dt class="inline-block">
        Start of the next maintenance:
      </dt>
      <dd class="font-bold inline-block">
        {{ formattedStartOfNextMaintenance }}
      </dd>
    </dl>
    <dl>
      <dt class="inline-block">
        Usual end of the next maintenance:
      </dt>
      <dd class="font-bold inline-block">
        {{ formattedEndOfNextMaintenance }}
      </dd>
    </dl>
    <dl>
      <dt class="inline-block">
        Time until the next maintenance:
      </dt>
      <dd class="font-bold inline-block">
        {{ formattedTimeUntilMaintenance }}
      </dd>
    </dl>
  </div>
</template>

<script>
import { DateTime, Duration } from 'luxon'

export default {
  data () {
    return {
      start: DateTime.local(),
      now: DateTime.local(),
      startOfMaintenance: DateTime.utc().set({ minutes: 0, seconds: 0, hours: 10 }),
      endOfMaintenance: DateTime.utc().set({ minutes: 30, seconds: 0, hours: 10 }),
      tick: null
    }
  },
  computed: {
    formattedStartOfNextMaintenance () {
      return this.startOfMaintenance.toHTTP()
    },
    formattedEndOfNextMaintenance () {
      return this.endOfMaintenance.toHTTP()
    },
    formattedTimeUntilMaintenance () {
      return Duration.fromObject(this.remaining).toFormat(`hh 'hours' mm 'minutes and' ss 'seconds'`)
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
    this.tick = setInterval(() => {
      this.now = DateTime.local()
    }, 10)

    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.tick)
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
