<template>
  <footer>
    <nav
      class="w-full flex flex-col lg:flex-row items-center justify-between flex-wrap border-t border-green-400 bg-gray-100 p-6"
    >
      <p class="text-sm my-2 lg:my-0">
        Powered by
        <a
          class="text-developmint-500 hover:text-developmint-300"
          href="https://developmint.de?ref=albionstatus.com"
          rel="noopener"
          target="_blank"
        >Developmint</a>
        © 2016-{{ $options.currentYearNumbers }} - All rights reserved. Albion Online is a registered
        trademark of Sandbox Interactive GmbH in Germany, and/or other countries.
      </p>
      <div>
        <nuxt-link
          no-prefetch
          to="/privacy/"
          class="gray-900 hover:underline inline-block my-2 lg:my-0"
        >
          Privacy
        </nuxt-link>
        &bull;
        <nuxt-link
          no-prefetch
          to="/legal/"
          class="gray-900 hover:underline inline-block my-2 lg:my-0"
        >
          Legal notice
        </nuxt-link>
      </div>
    </nav>
  </footer>
</template>

<script>
export default {
  currentYearNumbers: (new Date()).getFullYear().toString().substr(-2)
}
</script>
