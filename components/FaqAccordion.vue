<template>
  <div class="max-w-screen-xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <slot name="heading" />
      <div class="mt-6 border-t-2 border-gray-200 pt-6">
        <dl>
          <div
            v-for="({question, answer}, i) in content"
            :key="question"
            :class="{'mt-6 border-t border-gray-200 pt-6': i}"
          >
            <dt class="text-lg leading-7">
              <!-- Expand/collapse question button -->
              <button
                class="text-left w-full flex justify-between items-start text-gray-400 focus:outline-none focus:text-gray-900"
                :aria-label="isExpanded(i) ? 'Collapse Question' : 'Expand Question'"
                @click="changeState(i)"
              >
                <span class="font-medium text-gray-900" v-html="question" />
                <span class="ml-6 h-7 flex items-center">
                  <svg
                    :class="{ '-rotate-180': isExpanded(i) }"
                    class="h-6 w-6 transform"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            </dt>
            <dd class="mt-2 pr-12">
              <p v-show="isExpanded(i)" class="text-base leading-6 text-gray-500" v-html="answer" />
            </dd>
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
  data () {
    return {
      expandedQuestionIndex: -1
    }
  },
  methods: {
    isExpanded (i) {
      return this.expandedQuestionIndex === i
    },
    changeState (i) {
      if (this.isExpanded(i)) {
        this.expandedQuestionIndex = -1
        return
      }
      this.expandedQuestionIndex = i
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