<template>
  <span>
    {{ $options.date }}
  </span>
</template>

<script lang="ts">
import { DateTime } from 'luxon'
import { defineComponent } from '@nuxtjs/composition-api'
import { DATE_OF_CREATION } from '~/shared/constants'

export default defineComponent({
  setup () {
    return {
      date: DateTime.fromISO(DATE_OF_CREATION).toLocaleString(DateTime.DATE_FULL)
    }
  }
})
</script>
