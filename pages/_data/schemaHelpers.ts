import type { FaqContent } from "./types.js";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

export function createFaqSchema(content: FaqContent[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.map((item) => ({
      "@type": "Question",
      name: stripHtml(item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(item.answer),
      },
    })),
  };
}
