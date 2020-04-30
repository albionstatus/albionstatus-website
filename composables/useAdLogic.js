import { computed, onBeforeMount, ref } from '@vue/composition-api'

const adSlotId = '2610490971'

export default function (ctx) {
  const currentPath = computed(() => ctx.root?.$route?.path)
  const notInLegalView = computed(() => !['/legal', '/privacy'].includes(currentPath.value))
  const hasAdblock = ref(undefined)
  onBeforeMount(async () => {
    hasAdblock.value = await new Promise((resolve) => {
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
  })

  return {
    hasAdblock,
    notInLegalView,
    adSlotId
  }
}
