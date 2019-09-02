<template>
  <footer>
    <div class="text-center py-2">
      <a
        v-if="$route.path !== '/'"
        href="/"
        class="gray-900 hover:underline inline-block"
        @click.prevent="jump"
      >
        Back to the server status page
      </a>
    </div>
    <nav
      class="w-full flex flex-col lg:flex-row items-center justify-between flex-wrap border-t border-green-400 bg-grey-lightest p-6"
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
          to="/faq/"
          class="gray-900 hover:underline inline-block my-2 lg:my-0"
        >
          FAQ
        </nuxt-link>
        &bull;
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
import jumpMixin from '@/shared/jumpMixin'

export default {
  currentYearNumbers: (new Date()).getFullYear().toString().substr(-2),
  mixins: [jumpMixin]
}
</script>
