<template>
  <div>
    <div class="text-center py-2">
      <a
        v-if="$route.path !== '/'"
        href="/"
        class="no-underline text-grey-darkest hover:text-black"
        @click.prevent="jump">
        Back to the server status page
      </a>
    </div>
    <nav
      class="w-full flex flex-col lg:flex-row items-center justify-between flex-wrap border-t border-green-light bg-grey-lightest p-6">
      <p class="text-sm my-2 lg:my-0">
        Powered by
        <a
          class="no-underline text-developmint hover:text-developmint-light"
          href="https://developmint.de"
          rel="noopener"
          target="_blank">Developmint</a>
        © 2016-{{ currentYearNumbers }} - All rights reserved. Albion Online is a registered
        trademark of Sandbox Interactive GmbH in Germany, and/or other countries.
      </p>
      <div>
        <nuxt-link
          to="faq"
          class="no-underline text-grey-darkest hover:text-black my-2 lg:my-0">
          <span class="hidden lg:visible"><i class="fa fa-fw fa-info"/></span> FAQ
        </nuxt-link>
        &bull;
        <nuxt-link
          to="privacy"
          class="no-underline text-grey-darkest hover:text-black my-2 lg:my-0">
          <span class="hidden lg:visible"><i class="fa fa-fw fa-low-vision"/></span> Privacy
        </nuxt-link>
        &bull;
        <nuxt-link
          to="legal"
          class="no-underline text-grey-darkest hover:text-black my-2 lg:my-0">
          Legal notice <span class="hidden lg:visible"><i class="fa fa-fw fa-legal"/></span>
        </nuxt-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    currentYearNumbers () {
      return (new Date()).getFullYear().toString().substr(-2)
    }
  },
  methods: {
    jump () {
      return this.$route.path === '/' ? this.$router.go(0) : this.$router.replace('/')
    }
  }
}
</script>
