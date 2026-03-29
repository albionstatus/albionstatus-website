import { defineHandler } from "void";
import { subWeeks } from "date-fns";
import { SERVER_NAMES } from "../../../../src/types.js";
import type { ServerName } from "../../../../src/types.js";
import { getPastStatuses } from "../../../../src/db.js";

export const GET = defineHandler(async (c) => {
  const server = c.req.param("server");

  if (!SERVER_NAMES.includes(server as ServerName)) {
    return c.json({ error: "bad request" }, 400);
  }

  const since = subWeeks(new Date(), 1);
  const result = await getPastStatuses(server as ServerName, since);
  if (!result) {
    return c.json({ error: "No past statuses found" }, 400);
  }

  c.header("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
  return result;
});
