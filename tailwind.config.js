const config = require('./tailwind/config')

config.plugins = [
  require('@tailwindcss/ui')({
    layout: 'sidebar'
  }),
  require('@tailwindcss/typography')
]

config.future = {
  removeDeprecatedGapUtilities: true,
  purgeLayersByDefault: true
}

config.theme.typography = {
  default: {
    css: {
      a: {
        '&:hover': {
          textDecoration: 'none'
        }
      }
    }
  }
}

config.purge = {
  content: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.js',
    'nuxt.config.js'
  ]
}

module.exports = config
