<template>
  <div class="container p-4 mx-auto">
    <h1 class="text-center text-4xl font-bold pb-4">
      FAQ - Frequently Asked Questions about AlbionStatus
    </h1>
    <div
      v-for="({ question, answer }, i) in $options.content"
      :key="i"
    >
      <h2 class="text-xl font-bold pt-12">
        {{ question }}
      </h2>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p class="text-lg mt-1" v-html="answer" />
    </div>
  </div>
</template>
<script>
import { encodeAnswer } from '@/shared/schemaHelpers'

export default {
  content: [
    {
      question: 'What is AlbionStatus?',
      answer: 'AlbionStatus is a fan-driven service that provides information about the Albion Online server, including the server status and information about it\'s location and daily maintenance.'
    },
    {
      question: 'So.. this is no official service?',
      answer: '<b>Nope, it is not</b>! We are no official part of Albion Online, not sponsored or endorsed of SBI.'
    },
    {
      question: 'Do we even need this now? There is an official server status page as well',
      answer: 'No, there is no official server status page anymore. AlbionStatus is the <strong>only</strong> server status tracker existing at the moment.'
    },
    {
      question: 'Your logo font is terrible man! It says AlbionGtatuf... WTF?!',
      answer: 'I chose that font because it is the <a href="https://www.dafont.com/koch-fette-deutsche-schrift.font"' +
      ' target="_blank" rel="noopener noreferrer nofollow" class="text-gray-600 hover:text-black ' +
      ' hover:underline">official Albion font</a>. It might be hard to read, I admit that! Fun fact: That font is an' +
      ' "old German" font. As you may know, the Albion Online dev team is from Germany as well!'
    },
    {
      question: 'Is this a scam page?',
      answer: 'No, don\'t worry, it is <strong>not</strong>! You don\'t have to enter any data on the page, so you can be sure that this' +
      ' is <b>no scam!</b> Also, the whole code is open-source.'
    },
    {
      question: 'How can I contact you?',
      answer: 'You can tweet our Twitter bot or write us a mail at <a class="text-gray-600 hover:text-black' +
      ' hover:underline" href="mailto:albionstatus@developmint.de" rel="noopener">albionstatus@developmint.de</a>.'
    },
    {
      question: 'Do you make money with this project?',
      answer: 'Recently I\'ve added ads to cover the hosting costs, but besides the ad revenue, which is quite small, I don\'t make any money with' +
      ' AlbionStatus!'
    },
    {
      question: 'Can I see your code? What\'s your tech stack?',
      answer: 'Good questions! Check out our <a class="text-gray-600 hover:text-black hover:underline"' +
      ' href="https://github.com/manniL/albionstatus-website/" rel="noopener">GitHub repository</a> for all information!'
    }
  ],
  head () {
    const title = 'FAQ - Frequently Asked Questions'
    const metaDescription = 'Read the answers to the most frequently asked questions about AlbionStatus and it\'s services'

    return {
      title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: title
        },
        {
          hid: 'description',
          name: 'description',
          content: metaDescription
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: metaDescription
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          json: {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': this.$options.content.map(content => ({
              '@type': 'Question',
              'name': content.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': encodeAnswer(content.answer)
              }
            }))
          }
        }
      ]
    }
  }
}
</script>
