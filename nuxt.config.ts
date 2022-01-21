import { NuxtConfig } from '@nuxt/types'
import { colors } from './tailwind/values'

const analyticsUA = 'UA-62902757-9'
const isDev = process.env.NODE_ENV !== 'production'
const isProd = !isDev

const baseUrl = 'https://www.albionstatus.com'

export default <NuxtConfig> {
  modern: isProd && 'client',
  target: 'static',
  components: true,
  env: {
    baseUrl
  },
  features: {
    transitions: false,
    asyncData: false
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
    fallback: true
  },

  meta: {
    name: 'AlbionStatus - Albion Online server status',
    author: 'Developmint',
    description: 'AlbionStatus is the only reliable Albion Online server status tracker. Find out if Albion is down' +
      ' in a splitsecond, no matter if the downtime is caused by the daily maintenance or an outage.',
    ogSiteName: 'AlbionStatus',
    mobileAppIOs: true,
    ogHost: 'https://albionstatus.com',
    twitterSite: '@AlbionStatus',
    twitterCard: 'summary'
  },

  buildModules: [
    '@nuxt/http',
    ['@nuxtjs/google-analytics', {
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
    }],
    '@nuxtjs/pwa',
    // 'nuxt-svg-loader',
    '@nuxt/content',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/tailwindcss',
    ['@nuxt/typescript-build', { typeCheck: false }],
    '@nuxtjs/netlify-files',
    ['nuxt-vitals', {
      trackingID: analyticsUA,
      debug: isDev
    }],
    '@nuxtjs/sitemap'
  ],

  http: {
    prefix: '/api/',
    proxy: isDev
  },

  proxy: {
    '/api/': { target: 'https://api.albionstatus.com/', pathRewrite: { '^/api/': '' } }
  },

  loading: { color: colors.developmint['500'] },

  manifest: {
    lang: 'en',
    short_name: 'AlbionStatus',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    orientation: 'any',
    theme_color: colors.green['300']
  },

  tailwindcss: {
    configPath: '~/tailwind.config.js',
    cssPath: '~/assets/css/app.pcss'
  },

  sitemap: {
    hostname: baseUrl,
    exclude: [
      '/legal',
      '/privacy'
    ],
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmodrealtime: true
    },
    trailingSlash: true
  },

  netlifyFiles: {
    existingFilesDirectory: './netlify-files'
  },

  build: {
    publicPath: '/assets/',
    loaders: {
      vue: {
        compilerOptions: {
          whitespace: 'condense'
        }
      }
    }
  }
}
