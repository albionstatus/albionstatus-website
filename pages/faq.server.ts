import { defineHead } from "void";
import { createFaqSchema } from "./_data/schemaHelpers.js";

const content = [
  {
    question: "What is AlbionStatus?",
    answer:
      "AlbionStatus is a fan-driven service that provides information about the Albion Online server.",
  },
  {
    question: "So... this is no official service?",
    answer:
      "Nope, it is not! We are no official part of Albion Online, not sponsored or endorsed of SBI.",
  },
  {
    question: "Do we even need this now?",
    answer:
      "No, there is no official server status page anymore. AlbionStatus is the only server status tracker existing at the moment.",
  },
  {
    question: "Your logo font is terrible man!",
    answer: "I chose that font because it is the official Albion font.",
  },
  {
    question: "Is this a scam page?",
    answer: "No, don't worry, it is not! The whole code is open-source.",
  },
  {
    question: "How can I contact you?",
    answer: "You can tweet our Twitter bot or write us a mail at albionstatus@developmint.de.",
  },
  {
    question: "Do you make money with this project?",
    answer: "Besides small ad revenue to cover hosting costs, no.",
  },
  {
    question: "Can I see your code?",
    answer: "Check out our GitHub repository for all information!",
  },
];

const title = "FAQ - Frequently Asked Questions | AlbionStatus";
const description =
  "Read the answers to the most frequently asked questions about AlbionStatus and it's services";

export const head = defineHead(() => ({
  title,
  meta: [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ],
  script: [{ type: "application/ld+json", innerHTML: JSON.stringify(createFaqSchema(content)) }],
}));
