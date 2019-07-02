<template>
  <div class="container p-4 mx-auto">
    <h1 class="text-center text-4xl font-bold pb-4">
      FAQ
    </h1>
    <div
      v-for="({ question, answer }, i) in $options.content"
      :key="i"
    >
      <h2 class="text-xl font-semibold py-2">
        {{ question }}
      </h2>
      <p
        class="text-lg py-4"
        v-html="answer"
      />
    </div>
  </div>
</template>
<script>
export default {
  content: [
    {
      question: 'What is this here?',
      answer: 'AlbionStatus is a fan-driven service that displays the status of the Albion server'
    },
    {
      question: 'So.. this is no official service?',
      answer: '<b>Nope</b>! We are no official part of Albion Online.'
    },
    {
      question: 'Do we even need this now? There is an official server status page as well',
      answer: 'You are right that there is an official page. Unfortunately, it\'s not as accurate as AlbionStatus,' +
      ' because it doesn\'t take daily maintenance and several other issues into consideration!'
    },
    {
      question: 'Your font is terrible man! It says AlbionGtatuf... WTF?!',
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
      ' hover:underline" href="mailto:albionstatus@developmint.de" rel="noopener">albionstatus@developmint.de</a>'
    },
    {
      question: 'Do you make money with this project?',
      answer: 'Recently I added Ads to cover the hosting costs, but besides this, I don\'t make any money with' +
      ' AlbionStatus!'
    },
    {
      question: 'Can I see your code? What\'s your tech stack?',
      answer: 'Good questions! Check out our <a class="text-gray-600 hover:text-black hover:underline"' +
      ' href="https://github.com/manniL/albionstatus-website/" rel="noopener">GitHub repository</a> for all information!'
    }
  ],
  head() {
    return {
      title: 'Faq - AlbionStatus'
    }
  }
}
</script>
