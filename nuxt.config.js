import { colors } from './tailwind/values'

const analyticsUA = 'UA-62902757-9'
const isDev = process.env.NODE_ENV !== 'production'
const isProd = !isDev

const baseUrl = 'https://www.albionstatus.com'

export default {
  modern: isProd && 'client',
  env: {
    baseUrl
  },
  head: {
    title: '',
    titleTemplate: s => s ? `${s} | AlbionStatus` : 'AlbionStatus - Is Albion Down?',
    noscript: [{ innerHTML: 'This website requires JavaScript.' }]
  },

  meta: {
    name: 'AlbionStatus - Albion Online server status',
    author: 'Developmint',
    description: 'AlbionStatus is the only reliable Albion Online server status tracker. Find out if Albion is down' +
      ' in a splitsecond, no matter if it is the daily maintenance or an outage.',
    ogSiteName: 'AlbionStatus',
    mobileAppIOs: true,
    ogHost: 'https://albionstatus.com',
    twitterSite: '@AlbionStatus',
    twitterCard: 'summary'
  },

  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/google-analytics', {
      id: analyticsUA,
      disabled: () => document.cookie.indexOf('ga_optout=true') !== -1,
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
    'nuxt-svg-loader',
    '@nuxtjs/netlify-files'
  ],

  plugins: [
    '~/plugins/vue-moment'
  ],

  axios: {
    debug: isDev,
    baseURL: 'https://api.albionstatus.com'
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

  devModules: [
    '@nuxtjs/tailwindcss'
  ],

  tailwindcss: {
    configPath: '~/tailwind.config.js',
    cssPath: '~/assets/css/app.pcss'
  },

  purgeCSS: {
    whitelistPatterns: [/fade/]
  },

  netlifyFiles: {
    existingFilesDirectory: './netlify'
  },

  build: {
    publicPath: '/assets/',
    extend(config, ctx) {
      if (!ctx.isClient) {
        return
      }
      if (!ctx.isDev) {
        return
      }
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      })
    }
  }
}
