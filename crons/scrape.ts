import { defineScheduled } from "void";
import { scrape } from "../src/scrape.js";

export const cron = "* * * * *";

export default defineScheduled(async () => {
  const result = await Promise.allSettled([scrape("sgp"), scrape("ams"), scrape("was")]);

  if (!result.every(({ status }) => status === "fulfilled")) {
    console.error("At least one scraper failed");
    console.error(result);
  }
});
