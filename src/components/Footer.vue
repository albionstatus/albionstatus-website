<template>
  <div>
    <div class="text-center py-2">
      <a @click.prevent="jump" href="/" v-if="$route.path !== '/'"
         class="no-underline text-grey-darkest hover:text-black">
        Back to the server status page
      </a>
    </div>
    <nav
      class="w-full flex flex-col md:flex-row items-center justify-between flex-wrap border-t border-green-light bg-grey-lightest p-6">
      <router-link to="faq" class="no-underline text-grey-darkest hover:text-black my-2 md:my-0">
        <i class="fa fa-fw fa-info"></i> FAQ
      </router-link>
      <p class="text-sm my-2 md:my-0">
        Powered by <a class="no-underline text-developmint hover:text-developmint-light" href="https://developmint.de"
                      rel="noopener" target="_blank">Developmint</a>
        © 2016-{{currentYearNumbers}} - All rights reserved. Albion Online is a registered
        trademark of Sandbox Interactive GmbH in Germany, and/or other countries.
      </p>
      <div>
        <router-link to="privacy" class="no-underline text-grey-darkest hover:text-black my-2 md:my-0">
          Privacy
        </router-link>
        &bull;
        <router-link to="legal" class="no-underline text-grey-darkest hover:text-black my-2 md:my-0">
          Legal notice <i class="fa fa-fw fa-legal"></i>
        </router-link>
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
