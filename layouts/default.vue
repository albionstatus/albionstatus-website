<template>
  <div class="h-screen flex overflow-hidden bg-white">
    <AppSidebar v-model="isSidebarShown" />
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div class="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
        <button
          class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
          aria-label="Open sidebar"
          @click="isSidebarShown = true"
        >
          <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <main class="bg-gray-50 flex-1 relative z-0 overflow-y-auto pt-2 pb-6 focus:outline-none md:py-6" tabindex="0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <Nuxt />
          <AdWrapper class="mt-8" />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AppSidebar from '~/components/AppSidebar'

export default {
  components: {
    AppSidebar,
    AdWrapper: () => import('~/components/AdWrapper')
  },
  data () {
    return {
      isSidebarShown: false
    }
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
