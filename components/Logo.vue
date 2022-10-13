<template>
  <a href="/" @click.prevent="jump">
    <picture class="h-16 w-auto">
      <source type="image/avif" srcset="~/assets/logo_small_128.avif 2x, ~/assets/logo_small_64.avif 1x">
      <source type="image/webp" srcset="~/assets/logo_small_128.webp 2x, ~/assets/logo_small_64.webp 1x">
      <source type="image/png" srcset="~/assets/logo_small_128.png 2x, ~/assets/logo_small_64.png 1x">
      <img src="~/assets/logo_small_128.png" alt="AlbionStatus Logo">
    </picture>
  </a>
</template>

<script setup lang="ts">

const router = useRouter()
const route = useRoute()
const jump = () => {
  const indexPath = '/'
  route.path === indexPath
    ? router.go(0)
    : router.push(indexPath)
}

</script>
