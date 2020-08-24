<template>
  <span>
    {{ $options.date }}
  </span>
</template>

<script>
import { DateTime } from 'luxon'
import { DATE_OF_CREATION } from '~/shared/constants'

export default {
  setup () {
    return {
      date: DateTime.fromISO(DATE_OF_CREATION).toLocaleString(DateTime.DATE_FULL)
    }
  }
}
</script>
