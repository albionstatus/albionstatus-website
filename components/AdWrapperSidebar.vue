<template>
  <div v-if="notInLegalView" class="flex flex-wrap flex-col w-full text-center mx-auto mt-8">
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
      <div v-show="!hideLabel" class="w-full mx-auto text-center text-sm text-gray-400">
        Advertisement
      </div>
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
  props: {
    hideLabel: {
      type: Boolean,
      default: false
    }
  },
  setup (_, ctx) {
    const { hasAdblock, notInLegalView, adSlotId } = useAdLogic(ctx)
    return { hasAdblock, notInLegalView, adSlotId }
  }
}
</script>
