import DOMPurify from 'isomorphic-dompurify'
import type { FaqContent } from '~/types'

DOMPurify.setConfig({
  ALLOWED_TAGS: ['#text'],
  KEEP_CONTENT: true,
})

const sanitizeHTML = (answer: string) => DOMPurify.sanitize(answer)

export const createFaqSchemaFromContent = (content: FaqContent[]) => ({
  type: 'application/ld+json',
  innerHTML: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': content.map(content => ({
      '@type': 'Question',
      'name': sanitizeHTML(content.question),
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': sanitizeHTML(content.answer),
      },
    })),
  }),
})
