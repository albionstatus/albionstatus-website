<template>
  <div
    v-if="notInLegalView"
    class="flex flex-wrap flex-col w-full text-center mx-auto mb-2 mt-8"
  >
    <adsbygoogle
      :slot="$options.adSlotId"
      class="w-full mx-auto mb-2"
    />
    <span class="mt-2 mb-1 text-sm text-gray-600">Advertisement</span>
  </div>
</template>

<script>
export default {
  computed: {
    notInLegalView () {
      return !['/legal', '/privacy'].includes(this.$route.path)
    }
  },
  adSlotId: '2610490971'
}
</script>
