export const encodeAnswer = answer => answer.replace(/"/g, '\'').replace(/\\n/g, '').trim()

export const createFaqSchemaFromContent = content => ({
  type: 'application/ld+json',
  json: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.map(content => ({
      '@type': 'Question',
      name: content.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: encodeAnswer(content.answer)
      }
    }))
  }
})
