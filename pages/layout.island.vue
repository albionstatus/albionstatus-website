<script setup lang="ts">
import AppSidebar from "./_components/app/AppSidebar.vue" with { island: "load" };
import AppFooter from "./_components/app/AppFooter.vue";
import AdWrapper from "./_components/ad/AdWrapper.vue" with { island: "idle" };
</script>

<style>
@import "./_assets/app.css";
</style>

<template>
  <div class="h-screen flex overflow-hidden bg-white">
    <AppSidebar />
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div
        class="bg-gray-50 flex-1 flex flex-col justify-between relative z-0 overflow-y-auto pt-2 md:pt-6 focus:outline-none"
        tabindex="0"
      >
        <main class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grow">
          <slot />
          <AdWrapper class="mt-8" path="/" />
        </main>
        <AppFooter />
      </div>
    </div>
  </div>
</template>
