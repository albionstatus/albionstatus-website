<script setup lang="ts">
import { DateTime } from 'luxon'
import { DATE_OF_CREATION } from '~/shared/constants'

const date = DateTime.fromISO(DATE_OF_CREATION).toLocaleString(DateTime.DATE_FULL)
</script>

<template>
  <span>{{ date }}</span>
</template>
