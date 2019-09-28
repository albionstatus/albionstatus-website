<template>
  <div class="min-h-screen flex flex-col justify-between">
    <AppHeader />
    <AdWrapper />
    <Nuxt />
    <AdWrapper />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'

export default {
  components: {
    AppHeader,
    AdWrapper: () => import('~/components/AdWrapper'),
    AppFooter: () => import('~/components/AppFooter')
  },
  head () {
    const baseUrl = process.env.baseUrl
    const { path } = this.$route
    const pathWithSlash = path.endsWith('/') ? path : `${path}/`
    return {
      link: [
        { rel: 'canonical', href: `${baseUrl}${pathWithSlash}` }
      ]
    }
  }
}
</script>
