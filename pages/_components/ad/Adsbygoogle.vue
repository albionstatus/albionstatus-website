<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import type { CSSProperties } from "vue";

const AD_CLIENT = "ca-pub-2368867988038528";
const SCRIPT_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;

const props = withDefaults(
  defineProps<{
    adSlot: string;
    adFormat?: string;
    adStyle?: CSSProperties;
    adLayout?: string;
    adLayoutKey?: string;
  }>(),
  {
    adFormat: "",
  },
);

const adRef = ref<HTMLElement | null>(null);
const isLoaded = ref(false);

function ensureScript(): Promise<void> {
  return new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      // Script tag exists — if it's already loaded, resolve immediately
      if ((window as any).adsbygoogle) {
        resolve();
      } else {
        existing.addEventListener("load", () => resolve(), { once: true });
      }
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => resolve(), { once: true });
    document.head.appendChild(script);
  });
}

function pushAd() {
  if (isLoaded.value) return;
  try {
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    isLoaded.value = true;
  } catch {
    // AdSense not available
  }
}

onMounted(async () => {
  await ensureScript();
  await nextTick();
  pushAd();
});
</script>

<template>
  <ins
    ref="adRef"
    class="adsbygoogle"
    :style="adStyle"
    :data-ad-client="AD_CLIENT"
    :data-ad-slot="adSlot"
    :data-ad-format="adFormat || undefined"
    :data-ad-layout="adLayout || undefined"
    :data-ad-layout-key="adLayoutKey || undefined"
  />
</template>
