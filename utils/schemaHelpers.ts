import DOMPurify from 'isomorphic-dompurify'

import type { FaqContent } from '~/types'

DOMPurify.setConfig({
  ALLOWED_TAGS: [],
})

const sanitizeAnswer = (answer: string) => {
  const res = DOMPurify.sanitize(answer)
  return res
}

export const createFaqSchemaFromContent = (content: FaqContent[]) => ({
  type: 'application/ld+json',
  innerHTML: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': content.map(content => ({
      '@type': 'Question',
      'name': content.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': sanitizeAnswer(content.answer),
      },
    })),
  }),
})
