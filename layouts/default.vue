<template>
  <div class="bg-diagonal min-h-screen flex flex-col justify-between">
    <AppHeader />
    <AdWrapper />
    <Nuxt />
    <AdWrapper />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '~/components/Header'

export default {
  components: {
    AppHeader,
    AdWrapper: () => import('~/components/AdWrapper'),
    AppFooter: () => import('~/components/Footer')
  }
}
</script>
