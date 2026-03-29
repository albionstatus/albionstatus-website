import { defineHead } from "void";
import { createFaqSchema } from "./_data/schemaHelpers.js";

const content = [
  {
    question: "How long does the server maintenance usually last?",
    answer: "The maintenance of the Albion servers lasts an average of 30 to 60 minutes per day.",
  },
  {
    question: "Why is the daily server maintenance needed at all?",
    answer:
      "The world of Albion is running on a single server. To update the game, fixing bugs or re-rolling the resource allocation, there is no other option than taking the game down.",
  },
  {
    question: "When does the Albion Online daily maintenance happen?",
    answer: "The maintenance is taking place from 10am to 11am UTC every day.",
  },
  {
    question: "What happens during the maintenance?",
    answer:
      "A world backup is created, server-side updates are applied, and resources are reshuffled.",
  },
];

const title = "Daily Maintenance of the Albion Online Servers | AlbionStatus";
const description =
  "Find out about the daily server maintenance for Albion Online. When does it happen? How long does it take? And what will be done during it?";

export const head = defineHead(() => ({
  title,
  meta: [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ],
  script: [{ type: "application/ld+json", innerHTML: JSON.stringify(createFaqSchema(content)) }],
}));
