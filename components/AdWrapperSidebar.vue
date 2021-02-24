<template>
  <div v-if="notInLegalView" class="flex flex-wrap flex-col w-full text-center mx-auto mt-8">
    <div aria-hidden="true">
      <a href="https://www.patreon.com/albionstatus" rel="noopener" target="_blank" class="inline-block py-4 px-8 border border-red-400 md:text-xl py-8 underline hover:no-underline">
        Please support AlbionStatus on Patreon
      </a>
    </div>
  </div>
</template>

<script>
import useAdLogic from '@/composables/useAdLogic'

export default {
  props: {
    hideLabel: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    return useAdLogic()
  }
}
</script>
