import type { ServerName, Status } from "./types.js";

export const STATUS_URLS: Record<ServerName, string> = {
  sgp: "https://serverstatus-sgp.albiononline.com/",
  ams: "https://serverstatus-ams.albiononline.com/",
  was: "https://serverstatus.albiononline.com/",
  // Legacy
  east: "https://serverstatus-ams.albiononline.com/",
  west: "https://serverstatus.albiononline.com/",
} as const;

export const SERVER_TO_DB: Record<ServerName, string> = {
  was: "server_west",
  west: "server_west",
  sgp: "server_east",
  east: "server_east",
  ams: "server_ams",
};

export const FAILING_STATUS: Status = {
  type: "unknown",
  message: "AlbionStatus couldn't fetch status. Likely there is a maintenance going on",
  comment: "Could not fetch status.",
};

export const TIMEOUT_INDICATORS = ["connect timed out", "read timed out"];

export const MESSAGES = {
  timeout: "Server timed out",
};
