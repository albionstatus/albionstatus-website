<template>
  <div v-if="notInLegalView" class="flex flex-wrap flex-col mx-auto w-full mb-2 mt-8">
    <template v-if="hasAdblock === false">
      <Adsbygoogle
        :slot="adSlotId"
        :ad-style="{
          display: 'inline-block',
          height: '250px'
        }"
        :ad-format="''"
        class="w-full mx-auto mb-2"
      />
      <span class="mt-2 mb-1 text-center text-sm text-gray-400">Advertisement</span>
    </template>
    <div v-if="hasAdblock === true" class="rounded-md bg-yellow-50 px-4 py-8">
      <div class="flex items-center justify-center">
        <div class="flex-shrink-0">
          <svg class="h-8 w-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="mx-3">
          <Heading tag="h3" class="text-yellow-800">
            Please support AlbionStatus by disabling your AdBlocker
          </Heading>
        </div>
        <div>
          <svg class="h-8 w-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { notInLegalView, hasAdblock, adSlotId } = useAdLogic()
</script>
