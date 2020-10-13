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
import { defineComponent, ref, useContext, useFetch } from '@nuxtjs/composition-api'
import ServerStatus from '~/components/ServerStatus'

export default defineComponent({
  components: {
    ServerStatus
  },
  setup () {
    const content = ref({})
    const { $content } = useContext()
    useFetch(async () => {
      content.value = await $content('index').fetch()
    })

    return {
      content
    }
  }
})
</script>
