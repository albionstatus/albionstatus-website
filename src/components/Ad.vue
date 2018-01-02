<template>
  <ins class="adsbygoogle" :class="adClass"
       :data-ad-client="adClient"
       :data-ad-slot="adSlot"
       :data-ad-format="adFormat"></ins>
</template>

<script>
  export default {
    props: {
      adClient: {
        type: String,
        required: true
      },
      adSlot: {
        type: String,
        required: true
      },
      adFormat: {
        type: String,
        required: false,
        default: 'auto'
      },
      adClass: {
        type: String,
        required: false,
        default: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      })
    }
  }
</script>
