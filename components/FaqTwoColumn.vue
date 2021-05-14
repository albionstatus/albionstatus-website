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
              <Heading tag="h2" class="text-xl leading-6">
                {{ question }}
              </Heading>
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

<script lang="ts">
import { computed, defineComponent, PropType, useMeta } from '@nuxtjs/composition-api'
import { createFaqSchemaFromContent } from '~/shared/schemaHelpers'
import { FaqContent } from '~/types'

const isInternalLink = (href: string | undefined) => href?.startsWith('/')

type InterpolationEl = HTMLElement & {
  $componentUpdated?: Function,
  $destroy?: Function
}

export default defineComponent({
  directives: {
    interpolation: {
      bind (el: InterpolationEl) {
        const navigate = (event: Event) => {
          const target = event.target as HTMLElement
          const href = target.getAttribute('href')

          if (!href) {
            return
          }
          event.preventDefault()
          window.$nuxt.$router.push(href)
        }

        const links = Array.from(el.getElementsByTagName('a')).filter((link) => {
          const href = link.getAttribute('href')
          return href && isInternalLink(href)
        })

        const addListeners = (links: Element[]) => {
          links.forEach((link) => {
            const href = link.getAttribute('href')
            if (!href) {
              return
            }

            if (isInternalLink(href)) {
              link.addEventListener('click', navigate, false)
            }
          })
        }

        const removeListeners = (links: Element[]) => {
          links.forEach(link => link.removeEventListener('click', navigate, false))
        }

        addListeners(links)

        el.$componentUpdated = () => {
          removeListeners(links)
          window.$nuxt.$nextTick(() => addListeners(links))
        }

        el.$destroy = () => removeListeners(links)
      },
      componentUpdated: (el: InterpolationEl) => el.$componentUpdated?.(),
      unbind: (el: InterpolationEl) => el.$destroy?.()
    }
  },
  props: {
    content: {
      type: Array as PropType<FaqContent[]>,
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
