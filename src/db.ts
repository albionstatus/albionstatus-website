import { db, eq, and, desc, gt } from "void/db";
import { statuses } from "../db/schema.js";
import { FAILING_STATUS, SERVER_TO_DB } from "./constants.js";
import type { ServerName, Status } from "./types.js";

export async function getLastStatus(server: ServerName): Promise<Status> {
  try {
    const result = await db
      .select({
        type: statuses.type,
        message: statuses.message,
        comment: statuses.comment,
      })
      .from(statuses)
      .where(eq(statuses.server, SERVER_TO_DB[server]))
      .orderBy(desc(statuses.createdAt))
      .limit(1);

    if (!result.length) {
      return {
        type: "unknown",
        message: "No entries yet, the bot is probably booting up",
        comment: "booting up",
      };
    }

    return result[0] as Status;
  } catch (e) {
    console.error("Could not fetch current server status");
    console.error(e);
    return FAILING_STATUS;
  }
}

export async function getPastStatuses(server: ServerName, since: Date): Promise<Status[] | false> {
  try {
    const sinceUnix = Math.floor(since.getTime() / 1000);
    const result = await db
      .select({
        type: statuses.type,
        message: statuses.message,
        comment: statuses.comment,
        createdAt: statuses.createdAt,
      })
      .from(statuses)
      .where(and(eq(statuses.server, SERVER_TO_DB[server]), gt(statuses.createdAt, sinceUnix)))
      .orderBy(desc(statuses.createdAt));

    if (!result.length) {
      return false;
    }

    return result.map((row) => ({
      ...row,
      createdAt: new Date(row.createdAt * 1000),
    })) as Status[];
  } catch (e) {
    console.error("Could not fetch past statuses");
    console.error(e);
    return false;
  }
}

export async function insertStatus(server: ServerName, status: Status) {
  const date = new Date();
  date.setSeconds(0);
  date.setMilliseconds(0);

  await db.insert(statuses).values({
    server: SERVER_TO_DB[server],
    type: status.type,
    message: status.message,
    comment: status.comment,
    createdAt: Math.floor(date.getTime() / 1000),
  });
}
