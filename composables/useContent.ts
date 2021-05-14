import { ref, useContext, useFetch } from '@nuxtjs/composition-api'
import { IContentDocument } from '@nuxt/content/types/content'

export const useBasicContent = (...args: Array<string | Object>) => {
  const { $content } = useContext()

  const content = ref()
  useFetch(async () => {
    content.value = await $content(...args).fetch<IContentDocument>()
  })

  return {
    content
  }
}
