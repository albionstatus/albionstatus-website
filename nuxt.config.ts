const ANALYTICS_UA = 'UA-62902757-9'
const IS_DEV = process.env.NODE_ENV !== 'production'

const baseUrl = 'https://www.albionstatus.com'

export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      baseUrl
    }
  },
  head: {
    title: '',
    titleTemplate: s => s ? `${s} | AlbionStatus` : 'AlbionStatus - Is Albion Down?',
    noscript: [{ innerHTML: 'This website requires JavaScript.' }]
  },

  router: {
    trailingSlash: true
  },

  generate: {
    fallback: '200.html'
  },

  typescript: {
    strict: true
  },

  modules: [
    /* ['@nuxtjs/google-analytics', {
      id: analyticsUA,
      disabled: () => document.cookie.includes('ga_optout=true'),
      debug: {
        sendHitTask: isProd
      },
      set: [
        { field: 'anonymizeIp', value: true }
      ]
    }],
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-4749840658812364',
      analyticsUacct: analyticsUA,
      test: isDev
    }], */
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
  },
  build: {
    publicPath: '/assets/'
  }
})
