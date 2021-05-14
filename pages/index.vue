<template>
  <div class="px-4 pt-0 pb-6 mx-auto">
    <div class="flex-1 min-w-0">
      <Heading>
        AlbionStatus - Your Server Status tracker
      </Heading>
    </div>
    <ServerStatus />
    <NuxtContent :document="content" class="prose lg:prose-lg mt-8 w-full max-w-none" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useBasicContent } from '~/composables/useContent'

export default defineComponent({
  setup () {
    const { content } = useBasicContent('index')
    return {
      content
    }
  }
}
)</script>
