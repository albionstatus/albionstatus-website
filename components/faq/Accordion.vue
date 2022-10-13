<template>
  <div class="max-w-screen-xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <slot name="heading" />
      <div class="mt-6 border-t-2 border-gray-200 pt-6">
        <dl>
          <div
            v-for="({ question, answer }, i) in content"
            :key="question"
            :class="{ 'mt-6 border-t border-gray-200 pt-6': i }"
          >
            <div class="text-lg leading-7">
              <button
                class="text-left w-full flex justify-between items-start text-gray-400 focus:outline-none focus:text-gray-900"
                :aria-label="isExpanded(i) ? 'Collapse Question' : 'Expand Question'"
                @click="changeState(i)"
              >
                <Heading tag="h2">
                  {{ question }}
                </Heading>
                <span class="ml-6 h-7 flex items-center">
                  <svg
                    :class="{ '-rotate-180': isExpanded(i) }"
                    class="h-6 w-6 transform"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <p
              v-show="isExpanded(i)"
              class="text-base leading-6 text-gray-500 mt-2 pr-12"
              v-html="answer"
            />
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { createFaqSchemaFromContent } from '@/shared/schemaHelpers'
import { FaqContent } from '~/types'

const props = defineProps<{
  content: FaqContent[]
}>()

const NONE_EXPANDED = -1
const expandedQuestionIndex = ref(NONE_EXPANDED)
const isExpanded = (i: number) => expandedQuestionIndex.value === i

const changeState = (i: number) => {
  if (isExpanded(i)) {
    expandedQuestionIndex.value = NONE_EXPANDED
    return
  }
  expandedQuestionIndex.value = i
}

useHead({
  script: [
    createFaqSchemaFromContent(props.content)
  ]
})
</script>
