<template>
  <header class="w-full text-center p-6 pb-2">
    <a
      href="/"
      class="no-underline"
      @click.prevent="jump"
    >
      <img
        src="~/assets/logo.png"
        alt="AlbionStatus logo"
      >
    </a>
  </header>
</template>

<script>
import jumpMixin from '@/shared/jumpMixin'

export default {
  mixins: [jumpMixin]
}
</script>
