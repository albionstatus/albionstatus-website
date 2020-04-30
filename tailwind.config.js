const config = require('./tailwind/config')

config.plugins = [
  require('@tailwindcss/ui')({
    layout: 'sidebar'
  })
]

module.exports = config
