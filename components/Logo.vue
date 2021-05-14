<template>
  <a href="/" @click.prevent="jump">
    <picture class="h-16 w-auto">
      <source type="image/avif" :srcset="imageSourceSet.avif">
      <source type="image/webp" :srcset="imageSourceSet.webp">
      <source type="image/png" :srcset="imageSourceSet.png">
      <img src="~/assets/logo_small_128.png" alt="AlbionStatus Logo">
    </picture>
  </a>
</template>

<script lang="ts">
import { defineComponent, useRoute, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()
    const jump = () => {
      const indexPath = '/'
      route.value.path === indexPath
        ? router.go(0)
        : router.push(indexPath)
    }

    const imageName = 'logo_small'
    const sizes = [{ px: '64', res: 1 }, { px: '128', res: 2 }]
    const extensions = ['png', 'webp', 'avif']

    const imageSourceSet = {}

    const buildImageSource = (size, ext, name) => `${require(`@/assets/${name}_${size.px}.${ext}`)} ${size.res}x`

    for (const ext of extensions) {
      imageSourceSet[ext] = sizes.map(size => buildImageSource(size, ext, imageName)).join(', ')
    }

    return {
      jump,
      imageSourceSet
    }
  }
}
)</script>
