<script setup lang="ts">
const isSidebarShown = ref(false)
const { baseUrl } = useRuntimeConfig()
const { path } = useRoute()
const pathWithSlash = path.endsWith('/') ? path : `${path}/`
const canonical = computed(() => `${baseUrl}${pathWithSlash}`)

useHead({
  link: [
    { rel: 'canonical', href: canonical },
  ],
})
</script>

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
      <div class="bg-gray-50 flex-1 flex flex-col justify-between relative z-0 overflow-y-auto pt-2 md:pt-6 focus:outline-none" tabindex="0">
        <main class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grow">
          <NuxtPage />
          <ClientOnly>
            <LazyAdWrapper class="mt-8" />
          </ClientOnly>
        </main>
        <LazyAppFooter />
      </div>
    </div>
  </div>
</template>
