import { defineHandler } from "void";
import { SERVER_NAMES } from "../../../src/types.js";
import type { ServerName } from "../../../src/types.js";
import { getLastStatus } from "../../../src/db.js";

export const GET = defineHandler(async (c) => {
  const server = c.req.param("server");

  if (!SERVER_NAMES.includes(server as ServerName)) {
    return c.json({ error: "bad request" }, 400);
  }

  const result = await getLastStatus(server as ServerName);
  c.header("Cache-Control", "public, max-age=30, s-maxage=30, stale-while-revalidate=60");
  return result;
});
