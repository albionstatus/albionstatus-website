<template>
  <div class="bg-white">
    <section class="max-w-screen-3xl mx-auto pt-12 pb-16 sm:pt-16 px-4 sm:px-6 lg:pb-28 lg:px-8">
      <slot name="heading" />
      <div>
        <slot name="intro" />
      </div>
      <div class="mt-6 border-t-2 border-gray-100 pt-10">
        <div class="md:grid md:grid-cols-2 md:gap-32">
          <div v-for="i in 2" :key="i" :class="{ 'mt-16 md:mt-0': i-1 }">
            <div v-for="({question, answer}, j) in splitContent[i-1]" :key="question" :class="{ 'mt-16': j }">
              <h2 class="text-xl leading-6 font-medium text-gray-900">
                {{ question }}
              </h2>
              <p v-interpolation class="text-base leading-6 text-gray-700 mt-2" v-html="answer" />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <slot name="outro" />
      </div>
    </section>
  </div>
</template>
<script>
import { computed, defineComponent, useMeta } from '@nuxtjs/composition-api'
import { createFaqSchemaFromContent } from '~/shared/schemaHelpers'

const isInternalLink = href => href?.startsWith('/')

export default defineComponent({
  directives: {
    interpolation: {
      bind (el) {
        const navigate = (event) => {
          const href = event.target.getAttribute('href')
          event.preventDefault()
          window.$nuxt.$router.push(href)
        }

        const links = Array.from(el.getElementsByTagName('a')).filter((link) => {
          const href = link.getAttribute('href')
          return isInternalLink(href)
        })

        const addListeners = (links) => {
          links.forEach((link) => {
            const href = link.getAttribute('href')
            if (isInternalLink(href)) {
              link.addEventListener('click', navigate, false)
            }
          })
        }

        const removeListeners = (links) => {
          links.forEach(link => link.removeEventListener('click', navigate, false))
        }

        addListeners(links)

        el.$componentUpdated = () => {
          removeListeners(links)
          window.$nuxt.$nextTick(() => addListeners(links))
        }

        el.$destroy = () => el.removeEventListener('click', removeListeners(links))
      },
      componentUpdated: el => el.$componentUpdated(),
      unbind: el => el.$destroy()
    }
  },
  props: {
    content: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const splitContent = computed(() => {
      const middle = Math.floor(props.content.length / 2)
      return [props.content.slice(0, middle), props.content.slice(middle)]
    })

    useMeta({
      script: [
        createFaqSchemaFromContent(props.content)
      ]
    })

    return {
      splitContent
    }
  },
  head: {}
})
</script>
