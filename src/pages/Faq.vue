<template>
  <div class="container p-4 mx-auto">
    <div class="flex flex-wrap flex-col w-full text-center mx-auto mt-2 mb-8">
      <span class="mt-2 mb-1 text-sm text-grey-dark">Advertisement</span>
      <ad ad-class="w-full mx-auto mb-2" ad-client="ca-pub-4749840658812364" ad-slot="6721996033"/>
    </div>
    <h1 class="text-center pb-4">FAQ</h1>
    <div v-for="topic in content">
      <h2 class="text-xl font-semibold py-2">{{topic.question}}</h2>
      <p class="text-lg py-4" v-html="topic.answer"></p>
    </div>
    <div class="flex flex-wrap flex-col w-full text-center mx-auto mb-2 mt-8">
      <ad ad-class="w-full mx-auto mb-2" ad-client="ca-pub-4749840658812364" ad-slot="6721996033"/>
      <span class="mt-2 mb-1 text-sm text-grey-dark">Advertisement</span>
    </div>
  </div>
</template>

<script>
  import { faqContent } from '../utilities'

  export default {
    data () {
      return {
        content: faqContent
      }
    }
  }
</script>
