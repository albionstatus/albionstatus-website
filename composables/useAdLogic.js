import { computed, onBeforeMount, ref } from '@vue/composition-api'

const adSlotId = '2610490971'

export default function (ctx) {
  const currentPath = computed(() => ctx.root?.$route?.path)
  const notInLegalView = computed(() => !['/legal', '/privacy'].includes(currentPath.value))
  const hasAdblock = ref(undefined)
  onBeforeMount(() => {
    window.addEventListener('load', async () => {
      hasAdblock.value = await new Promise((resolve) => {
        const element = document.createElement('div')
        const baitClass = 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links'
        const baitStyle = 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;\''
        element.setAttribute('class', baitClass)
        element.setAttribute('style', baitStyle)
        document.body.appendChild(element)
        setTimeout(() => {
          const possibleElement = window.getComputedStyle(element, null)
          const hasDetectedAd = possibleElement?.getPropertyValue('display') === 'none' || possibleElement?.getPropertyValue('visibility') === 'hidden'
          const didNotLoadAnalytics = document.querySelector('.adsbygoogle')?.dataset.adsbygoogleStatus !== 'done'
          document.body.removeChild(element)
          resolve(hasDetectedAd || didNotLoadAnalytics)
        }, 1)
      })
    }, { once: true })
  })

  return {
    hasAdblock,
    notInLegalView,
    adSlotId
  }
}
