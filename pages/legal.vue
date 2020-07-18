<template>
  <NuxtContent :document="content" class="container mx-auto p-4 prose lg:prose-lg" />
</template>

<script>

export default {
  async fetch () {
    this.content = await this.$content('legal').fetch()
  },
  data () {
    return {
      content: {}
    }
  },
  head () {
    return {
      title: 'Legal',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
