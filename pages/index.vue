<template>
  <div class="px-4 pt-0 pb-6 mx-auto">
    <div class="flex-1 min-w-0">
      <h1 class="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
        AlbionStatus - Your Server Status tracker
      </h1>
    </div>
    <ServerStatus />
    <NuxtContent :document="content" class="prose lg:prose-lg mt-8 w-full max-w-none" />
  </div>
</template>

<script>
import { useBasicContent } from '~/composables/useContent'

export default {
  setup () {
    const { content } = useBasicContent('index')
    return {
      content
    }
  }
}
</script>
