<template>
  <footer class="bg-white">
    <div class="max-w-screen-xl mx-auto py-6 md:py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
      <div class="flex justify-center">
        <p class="flex flex-col md:block text-base leading-6 text-gray-400 max-w-3xl md:max-w-xl xl:max-w-none">
          <span>Powered by
            <a
              class="text-developmint-300 hover:text-developmint-500"
              href="https://developmint.de?ref=albionstatus.com"
              rel="noopener"
              target="_blank"
            >Developmint</a>
            &copy; {{ currentYearNumbers }}</span>
          <span class="md:block xl:inline-block xl:ml-1">
            All rights reserved. Albion Online is a registered
            trademark of Sandbox Interactive GmbH in Germany, and/or other countries.
          </span>
        </p>
      </div>
      <div class="flex justify-center items-center mt-4 text-sm md:mt-0">
        <NuxtLink no-prefetch to="/privacy/" class="text-gray-400 hover:text-gray-500 inline-block my-2 lg:my-0">
          Privacy
        </NuxtLink>
        <span class="mx-1 text-gray-400">&bull;</span>
        <NuxtLink no-prefetch to="/legal/" class="text-gray-400 hover:text-gray-500 inline-block my-2 lg:my-0">
          Legal notice
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  setup () {
    return {
      currentYearNumbers: (new Date()).getFullYear().toString()
    }
  }
}
</script>
