import { ref, useContext, useFetch } from '@nuxtjs/composition-api'

export const useBasicContent = (...args) => {
  const { $content } = useContext()

  const content = ref('')
  useFetch(async () => {
    content.value = await $content(...args).fetch()
  })

  return {
    content
  }
}
