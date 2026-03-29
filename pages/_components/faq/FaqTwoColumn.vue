<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "@void/vue";
import Heading from "../Heading.vue";
import type { FaqContent } from "../../_data/types.js";

const props = defineProps<{ content: FaqContent[] }>();

const splitContent = computed(() => {
  const middle = Math.floor(props.content.length / 2);
  return [props.content.slice(0, middle), props.content.slice(middle)];
});

const router = useRouter();

function handleClick(event: Event) {
  const target = event.target as HTMLElement;
  if (target.tagName !== "A") return;
  const href = target.getAttribute("href");
  if (!href?.startsWith("/")) return;
  event.preventDefault();
  router.visit(href);
}
</script>

<template>
  <div class="bg-white">
    <section class="max-w-screen-3xl mx-auto pt-12 pb-16 sm:pt-16 px-4 sm:px-6 lg:pb-28 lg:px-8">
      <slot name="heading" />
      <div>
        <slot name="intro" />
      </div>
      <div class="mt-6 border-t-2 border-gray-100 pt-10">
        <div class="md:grid md:grid-cols-2 md:gap-32">
          <div v-for="i in 2" :key="i" :class="{ 'mt-16 md:mt-0': i - 1 }">
            <div
              v-for="({ question, answer }, j) in splitContent[i - 1]"
              :key="question"
              :class="{ 'mt-16': j }"
            >
              <Heading tag="h2" class="text-xl leading-6">
                {{ question }}
              </Heading>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p
                class="text-base leading-6 text-gray-700 mt-2"
                @click="handleClick"
                v-html="answer"
              />
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
