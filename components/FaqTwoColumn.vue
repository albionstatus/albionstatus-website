<template>
  <div class="bg-white">
    <div class="max-w-screen-3xl mx-auto pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:pt-20 lg:pb-28 lg:px-8">
      <slot name="heading" />
      <div class="mt-6 border-t-2 border-gray-100 pt-10">
        <dl class="md:grid md:grid-cols-2 md:gap-32">
          <div v-for="i in 2" :class="{ 'mt-12 md:mt-0': i-1 }" :key="i">
            <div v-for="({question, answer}, j) in splitContent[i-1]" :key="question" :class="{ 'mt-12': j }">
              <dt class="text-lg leading-6 font-medium text-gray-900">
                {{ question }}
              </dt>
              <dd class="mt-6">
                <p class="text-base leading-6 text-gray-700" v-html="answer" />
              </dd>
            </div>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
import { encodeAnswer } from '@/shared/schemaHelpers'

export default {
  props: {
    content: {
      type: Array,
      required: true
    }
  },
  computed: {
    splitContent () {
      const middle = Math.floor(this.content.length / 2)
      return [
        this.content.slice(0, middle), this.content.slice(middle)
      ]
    }
  },
  head () {
    return {
      script: [
        {
          type: 'application/ld+json',
          json: {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: this.content.map(content => ({
              '@type': 'Question',
              name: content.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: encodeAnswer(content.answer)
              }
            }))
          }
        }
      ]
    }
  }
}
</script>
