<template>
  <NuxtContent :document="content" class="container mx-auto p-4 prose lg:prose-lg" />
</template>

<script>

export default {
  async fetch () {
    this.content = await this.$content('privacy').fetch()
  },
  data () {
    return {
      content: {}
    }
  },
  head () {
    return {
      title: 'Privacy',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
