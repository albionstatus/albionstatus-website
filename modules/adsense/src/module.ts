
import { defineNuxtModule, logger, addComponentsDir } from '@nuxt/kit'
import defu from 'defu'
import { ADSENSE_URL, DEFAULTS, ModuleOptions, TEST_ID } from './config'

export type { ModuleOptions }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/google-adsense-fork',
    configKey: 'google-adsense',
    compatibility: {
      nuxt: '^3.0.0-rc.11'
    }
  },
  defaults: (nuxt) => {
    return {
      ...DEFAULTS,
      test: nuxt.options.dev && process.env.NODE_ENV !== 'production'
    }
  },
  setup(options, nuxt) {
    if (options.test) {
      logger.info('Test mode enabled - Using Test Adsense ID')
      options.id = TEST_ID
    }

    if (!options.id || typeof options.id !== 'string') {
      logger.warn('Invalid adsense client ID specified')
      return
    }

    nuxt.options.app.head.script = nuxt.options.app.head.script ?? []

    // Add the async Google AdSense script to head
    nuxt.options.app.head.script.push({
      hid: 'adsbygoogle-script',
      defer: true,
      crossorigin: 'anonymous',
      src: `${ADSENSE_URL}?client=${options.id}`
    })

    const adsenseScript = `{
      google_ad_client: "${options.id}",
      overlays: {bottom: ${options.overlayBottom}},
      ${options.pageLevelAds ? 'enable_page_level_ads: true' : ''}
    }`
    // Initialize Adsense with ad client id
    if (!options.onPageLoad) {
      nuxt.options.app.head.script.push(
        createScriptMeta(
          `adsbygoogle.pauseAdRequests=${options.pauseOnLoad ? '1' : '0'};
          adsbygoogle.push(${adsenseScript});`
        )
      )
    } else {
      nuxt.options.app.head.script.push(
        createScriptMeta(
          `adsbygoogle.onload = function () {
            adsbygoogle.pauseAdRequests=${options.pauseOnLoad ? '1' : '0'};
            [].forEach.call(document.getElementsByClassName('adsbygoogle'), function () { adsbygoogle.push(${adsenseScript}); })
          };`
        )
      )
    }

    // If in DEV mode, add robots meta first to comply with Adsense policies
    // To prevent MediaPartners from scraping the site
    if (options.test) {
      nuxt.options.app.head.meta = nuxt.options.app.head.meta ?? []
      nuxt.options.app.head.meta.unshift({
        name: 'robots',
        content: 'noindex,noarchive,nofollow'
      })
    }

    // Add component to auto load
    addComponentsDir({
      path: '~/modules/adsense/src/runtime/components',
      isAsync: false,
      prefix: '',
      level: 999
    })

    // Inject options into runtime config
    nuxt.options.runtimeConfig.public['google-adsense'] = defu(
      nuxt.options.runtimeConfig.public['google-adsense'],
      { options }
    )
  }
})

function createScriptMeta(script: string) {
  // Ensure `window.adsbygoogle` is defined
  script = `(window.adsbygoogle = window.adsbygoogle || []); ${script}`
  // wrapp script inside a guard check to ensure it executes only once
  script = `if (!window.__abg_called){ ${script} window.__abg_called = true;}`

  return {
    hid: 'adsbygoogle',
    children: script
  }
}