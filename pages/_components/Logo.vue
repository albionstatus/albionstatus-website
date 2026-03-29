<script setup lang="ts">
import { useRouter } from "@void/vue";
import logo128avif from "../_assets/logo_small_128.avif";
import logo128webp from "../_assets/logo_small_128.webp";
import logo128png from "../_assets/logo_small_128.png";
import logo64avif from "../_assets/logo_small_64.avif";
import logo64webp from "../_assets/logo_small_64.webp";
import logo64png from "../_assets/logo_small_64.png";

const router = useRouter();

function jump() {
  router.visit("/");
}
</script>

<template>
  <a href="/" @click.prevent="jump">
    <picture class="h-16 w-auto">
      <source type="image/avif" :srcset="`${logo128avif} 2x, ${logo64avif} 1x`" />
      <source type="image/webp" :srcset="`${logo128webp} 2x, ${logo64webp} 1x`" />
      <source type="image/png" :srcset="`${logo128png} 2x, ${logo64png} 1x`" />
      <img :src="logo128png" alt="AlbionStatus Logo" loading="lazy" />
    </picture>
  </a>
</template>
