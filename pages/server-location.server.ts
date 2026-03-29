import { defineHead } from "void";
import { createFaqSchema } from "./_data/schemaHelpers.js";

const content = [
  {
    question: "How many Albion servers exist?",
    answer: "All players play on the same server instance.",
  },
  {
    question: "Does the server location negatively influence the game experience?",
    answer: "Generally speaking, it should not influence your game experience.",
  },
  {
    question: "Where is the Albion Online server located?",
    answer: "The server of Albion West is located in Washington DC, USA.",
  },
  {
    question: "Are there EU or OCE servers available for Albion?",
    answer: "There is no european or australian/oceanic server for Albion Online yet.",
  },
  {
    question: "How do I see my ping or latency when playing Albion Online?",
    answer: "When you are in the game, type /ping.",
  },
];

const title = "About the location of the Albion Online servers | AlbionStatus";
const description =
  "Where are the Albion servers located? Is the location the cause of bad in-game experiences? How many of them actually exist? Find an answer to these question on AlbionStatus";

export const head = defineHead(() => ({
  title,
  meta: [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ],
  script: [{ type: "application/ld+json", innerHTML: JSON.stringify(createFaqSchema(content)) }],
}));
