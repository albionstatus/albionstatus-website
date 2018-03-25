const tailwindConfig = require('./tailwind.js')
const path = require('path')
const process = require('process')
const glob = require('glob-all')
const PurgeCssPlugin = require('purgecss-webpack-plugin')
module.exports = {
  /*
   * Scroll behavior
   */
  router: {
    scrollBehavior (to, from, savedPosition) {
      let position = false

      if (to.matched.length < 2 || to.matched.some((r) => r.components.default.options.scrollToTop)) {
        position = { x: 0, y: 0 }
      }

      if (savedPosition) {
        position = savedPosition
      }

      return new Promise(resolve => {
        // wait for the out transition to complete (if necessary)
        window.$nuxt.$once('triggerScroll', () => {
          // coords will be used if no selector is provided,
          // or if the selector didn't match any element.
          if (to.hash && document.querySelector(to.hash)) {
            // scroll to anchor by returning the selector
            position = { selector: to.hash }
          }
          resolve(position)
        })
      })
    }
  },

  /*
   * Headers of the page
   */

  head: {
    meta: [
      {
        'http-equiv': 'x-ua-compatible', content: 'ie=edge'
      }
    ]
  },
  meta: {
    name: 'AlbionStatus - Albion Online server status',
    author: 'Developmint',
    description: 'AlbionStatus is the first reliable Albion Online server status tracker',
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    mobileAppIOs: true,
    ogHost: 'https://albionstatus.com',
    twitterCard: 'summary'
  },
  /*
  ** CSS Load
   */
  css: [
    // SCSS file in the project
    '@/assets/styles/app.scss'
  ],
  /*
  ** Modules
   */
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/google-analytics', {
      id: 'UA-62902757-9'
    }],
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-4749840658812364',
      analyticsUacct: 'UA-62902757-9'
    }],
    '@nuxtjs/pwa'
  ],
  plugins: [
    '~/plugins/vue-moment',
    { src: '~/plugins/vue-tooltip', ssr: false }
  ],

  /*
   * Axios
   */
  axios: {
    debug: process.env.NODE_ENV === 'dev',
    baseURL: 'https://api.albionstatus.com'
  },

  /*
   * Customize the progress bar color
  */
  loading: { color: tailwindConfig.colors.developmint },
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: 'white',
    background: tailwindConfig.colors.developmint
  },

  /*
  ** Manifest
   */
  manifest: {
    lang: 'en',
    short_name: 'AlbionStatus',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    orientation: 'any',
    theme_color: tailwindConfig.colors['green-light']
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios'],
    maxChunkSize: 300000,
    extractCSS: {
      allChunks: true
    },
    postcss: [
      require('tailwindcss')('./tailwind.js'),
      require('autoprefixer')
    ],
    /*
    ** Run ESLint on save
    ** Add PurgeCSS
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        if (ctx.isDev) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          })
        } else {
          config.plugins.push(new PurgeCssPlugin({
            paths: glob.sync([
              path.join(__dirname, 'components/**/*.vue'),
              path.join(__dirname, 'layouts/**/*.vue'),
              path.join(__dirname, 'pages/**/*.vue'),
              path.join(__dirname, 'plugins/**/*.vue')
            ]),
            styleExtensions: ['.css'],
            whitelist: ['body', 'html', 'nuxt-progress'],
            extractors: [
              {
                extractor: class {
                  static extract (content) {
                    return content.match(/[A-z0-9-:\\/]+/g)
                  }
                },
                extensions: ['vue', 'js']
              }
            ]
          }))
        }
      }
    }
  }
}
