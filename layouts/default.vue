<template>
  <div class="bg-diagonal min-h-screen flex flex-col justify-between">
    <app-header/>
    <div class="flex flex-wrap flex-col w-full text-center mx-auto mt-2 mb-8">
      <span class="mt-2 mb-1 text-sm text-grey-dark">Advertisement</span>
      <adsbygoogle
        slot="6721996033"
        class="w-full mx-auto mb-2"/>
    </div>
    <nuxt/>
    <div class="flex flex-wrap flex-col w-full text-center mx-auto mb-2 mt-8">
      <adsbygoogle
        slot="6721996033"
        class="w-full mx-auto mb-2"/>
      <span class="mt-2 mb-1 text-sm text-grey-dark">Advertisement</span>
    </div>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from '~/components/Header'

export default {
  components: {
    AppHeader,
    AppFooter: () => import('~/components/Footer')
  }
}
</script>
