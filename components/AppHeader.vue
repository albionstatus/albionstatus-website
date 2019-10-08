<template>
  <nav class="container flex items-center justify-between flex-wrap p-4">
    <a
      href="/"
      class="flex items-center flex-no-shrink mr-auto"
      @click.prevent="jump"
    >
      <img
        src="~/assets/logo.png"
        alt="AlbionStatus logo"
        width="250px"
      >
    </a>
    <div
      class="block lg:hidden"
    >
      <button
        class="flex items-center justify-center px-3 border rounded text-gray-800 border-gray-800 w-10 hover:text-gray-600 hover:border-gray-600"
        @click="toggleVisibility"
      >
        <svg
          view-box="0 0 20 20"
          class="w-8 h-8 fill-current block py-1"
        >
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div
      :class="{'hidden': !isVisible}"
      class="w-full mt-2 lg:mt-0 lg:block lg:flex lg:items-center lg:justify-start lg:w-auto text-xl"
    >
      <div v-for="(link, i) in $options.links" :key="link.to">
        <span v-if="i > 0" class="hidden lg:inline-block text-black">&bull;</span>
        <NuxtLink
          class="text-gray-900 hover:underline bg-gray-300 lg:bg-transparent hover:bg-gray-400 lg:hover:bg-transparent pl-4 py-2 lg:p-0 mt-2 lg:mt-0 lg:mx-8 block lg:inline-block rounded-full"
          :to="link.to"
        >
          {{ link.name }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isVisible: false
    }
  },
  methods: {
    toggleVisibility () {
      this.isVisible = !this.isVisible
    },
    jump () {
      const indexPath = '/'
      this.$route.path === indexPath ? this.$router.go(0) : this.$router.replace(indexPath)
    }
  },
  links: [
    {
      name: 'Uptime charts',
      to: '/charts/'
    },
    {
      name: 'Daily Maintenance',
      to: '/daily-maintenance/'
    },
    {
      name: 'Server Location',
      to: '/server-location/'
    },
    {
      name: 'FAQ',
      to: '/faq/'
    }
  ]
}
</script>
