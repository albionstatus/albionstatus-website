const baseUrl = 'https://www.albionstatus.com'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl
    },
  },
  app: {
    head: {
      noscript: [{ innerHTML: 'This website requires JavaScript.' }],
    },
  },

  nitro: {
    prerender: {
      routes: [
        '/404.html',
      ],
    },
    devProxy: {
      '/api/status/': {
        target: 'https://api-new.albionstatus.com/',
        prependPath: false,
        changeOrigin: true,
      },
    },
  },

  modules: [
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-2368867988038528',
    }],
    '@kevinmarrec/nuxt-pwa',
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/plausible',
  ],

  plausible: {
    domain: 'albionstatus.com',
    apiHost: 'https://plausible.lichter.io',
  },

  pwa: {
    meta: {
      name: 'AlbionStatus - Albion Online server status',
      author: 'Developmint',
      description: 'AlbionStatus is the only reliable Albion Online server status tracker. Find out if Albion is down'
        + ' in a splitsecond, no matter if the downtime is caused by the daily maintenance or an outage.',
      ogSiteName: 'AlbionStatus',
      ogHost: 'https://albionstatus.com',
      twitterSite: '@AlbionStatus',
      twitterCard: 'summary',
    },
    manifest: {
      lang: 'en',
      short_name: 'AlbionStatus',
      start_url: '/',
      display: 'standalone',
      background_color: '#FFFFFF',
    },
  },
})
