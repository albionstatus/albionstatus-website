const ANALYTICS_UA = 'UA-62902757-9'

const baseUrl = 'https://www.albionstatus.com'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl,
      analyticsUA: ANALYTICS_UA,
    }
  },
  app: {
    head: {
      noscript: [{ innerHTML: 'This website requires JavaScript.' }]
    },
  },

  generate: {
    fallback: '200.html'
  },

  typescript: {
    strict: true
  },

  modules: [
    ['~/modules/adsense/src/module.ts', {
      id: 'ca-pub-4749840658812364',
      analyticsUacct: ANALYTICS_UA
    }],
    '@kevinmarrec/nuxt-pwa',
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs-alt/proxy'
  ],

  proxy: {
    '^/api/status/': {
      target: 'https://api.albionstatus.com/',
      rewrite: (path: string) => path.replace(/^\/api\/status/, '')
    }
  },

  pwa: {
    meta: {
      name: 'AlbionStatus - Albion Online server status',
      author: 'Developmint',
      description: 'AlbionStatus is the only reliable Albion Online server status tracker. Find out if Albion is down' +
        ' in a splitsecond, no matter if the downtime is caused by the daily maintenance or an outage.',
      ogSiteName: 'AlbionStatus',
      ogHost: 'https://albionstatus.com',
      twitterSite: '@AlbionStatus',
      twitterCard: 'summary'
    },
    manifest: {
      lang: 'en',
      short_name: 'AlbionStatus',
      start_url: '/',
      display: 'standalone',
      background_color: '#FFFFFF',
    }
  }
})
