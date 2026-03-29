import { defineHead } from "void";

const title = "Season 17 Schedule | AlbionStatus";
const description =
  "Read more about the schedule of the current Albion Online season, reset days and territory claiming";

export const head = defineHead(() => ({
  title,
  meta: [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ],
}));
