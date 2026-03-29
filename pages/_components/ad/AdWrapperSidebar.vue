<script setup lang="ts">
import Adsbygoogle from "./Adsbygoogle.vue";
import { useAdLogic } from "../../_composables/useAdLogic.js";

withDefaults(defineProps<{ hideLabel?: boolean; path: string }>(), { hideLabel: false });

const { hasAdblock, adSlotId } = useAdLogic("/");
</script>

<template>
  <div class="flex flex-wrap flex-col w-full text-center mx-auto mt-8">
    <template v-if="hasAdblock === false">
      <Adsbygoogle
        :ad-slot="adSlotId"
        :ad-style="{
          display: 'inline-block',
          height: '16rem',
        }"
        class="w-full mx-auto max-h-64"
      />
      <div v-show="!hideLabel" class="w-full mx-auto text-center text-sm text-gray-400">
        Advertisement
      </div>
    </template>
    <div v-if="hasAdblock === true" aria-hidden="true">
      <div class="inline-block px-8 border border-red-400 md:text-xl py-8">
        Please support AlbionStatus by disabling your AdBlocker &#10084;
      </div>
    </div>
  </div>
</template>
