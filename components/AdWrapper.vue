<template>
  <div v-if="notInLegalView" class="flex flex-wrap flex-col w-full text-center mx-auto mb-2 mt-8">
    <template v-if="hasAdblock === false">
      <adsbygoogle
        :slot="adSlotId"
        :ad-style="{
          display: 'inline-block',
          width: '100%',
          'max-height': '250px'
        }"
        :ad-format="''"
        class="w-full mx-auto mb-2"
      />
      <span class="mt-2 mb-1 text-sm text-gray-600">Advertisement</span>
    </template>
    <div v-if="hasAdblock === true" class="mt-2 md:mt-8 mb-4 md:mb-16" aria-hidden="true">
      <div class="inline-block py-4 px-8 border border-red-400 md:text-2xl underline">
        Please support AlbionStatus by disabling your AdBlocker ❤
      </div>
    </div>
  </div>
</template>

<script>
import useAdLogic from '@/composables/useAdLogic'

export default {
  setup (_, ctx) {
    const { hasAdblock, notInLegalView, adSlotId } = useAdLogic(ctx)
    return { hasAdblock, notInLegalView, adSlotId }
  }
}
</script>
