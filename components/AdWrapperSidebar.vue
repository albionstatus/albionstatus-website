<template>
  <div v-if="notInLegalView" class="flex flex-wrap flex-col w-full text-center mx-auto">
    <template v-if="hasAdblock === false">
      <adsbygoogle
        :slot="adSlotId"
        :ad-style="{
          display: 'inline-block',
          height: '16rem'
        }"
        :ad-format="''"
        class="w-full mx-auto max-h-64"
      />
      <span class="mt-2 mb-1 text-sm text-gray-400">Advertisement</span>
    </template>
    <div v-if="hasAdblock === true" aria-hidden="true">
      <div class="inline-block py-4 px-8 border border-red-400 md:text-xl py-8">
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
