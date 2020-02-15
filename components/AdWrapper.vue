<template>
  <div
    v-if="notInLegalView"
    class="flex flex-wrap flex-col w-full text-center mx-auto mb-2 mt-8"
  >
    <template v-if="hasAdblock === false">
      <adsbygoogle
        :slot="$options.adSlotId"
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
export default {
  data () {
    return {
      hasAdblock: undefined
    }
  },
  computed: {
    notInLegalView () {
      return !['/legal', '/privacy'].includes(this.$route.path)
    }
  },
  async beforeMount () {
    this.hasAdblock = await new Promise((resolve) => {
      const element = document.createElement('div')
      element.classList.add('adBanner')
      element.style.cssText = 'height: 1px; width: 1px; background-color: transparent'
      document.body.appendChild(element)
      window.setTimeout(() => {
        const isRemovingFakeAd = document.querySelector('.adBanner').clientHeight === 0
        resolve(isRemovingFakeAd)
        document.body.removeChild(element)
      }, 100)
    })
  },
  adSlotId: '2610490971'
}
</script>
