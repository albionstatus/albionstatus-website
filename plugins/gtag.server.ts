export default defineNuxtPlugin(({ app }) => {
  const config = useRuntimeConfig()
  const id = config.analyticsUA

  const preloadLinks = [
    {
      re1l: 'preload',
      as: 'script',
      href: `https://www.googletagmanager.com/gtag/js?id=${id}`,
    },
    {
      rel: 'preconnect',
      href: 'https://www.google-analytics.com/',
    },
  ]
  if (process.env.NODE_ENV === 'production') {
    if (app.head) {
      app.head.link = [...(app.head.link || []), ...preloadLinks]
    }
    else {
      app.head = {
        link: preloadLinks,
      }
    }
  }
})
