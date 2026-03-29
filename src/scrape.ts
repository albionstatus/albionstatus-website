import type { ServerName, Status, StatusType } from "./types.js";
import { getLastStatus, insertStatus } from "./db.js";
import { $fetch } from "ofetch";
import consola from "consola";
import { FAILING_STATUS, MESSAGES, TIMEOUT_INDICATORS, STATUS_URLS } from "./constants.js";

export async function scrape(server: ServerName) {
  const logger = consola.withTag(`scraper-${server}`);
  logger.info(`Start scraping`);

  const [currentStatus, lastStatus] = await Promise.all([
    getCurrentStatus(server),
    getLastStatus(server),
  ]);

  await insertStatus(server, currentStatus);
  logger.info("Inserted status");

  const didStatusUpdate = areStatusesDifferent(currentStatus, lastStatus);
  return { didStatusUpdate, currentStatus };
}

function areStatusesDifferent(currentStatus: Status, lastStatus?: Status) {
  if (!lastStatus) {
    return false;
  }

  return JSON.stringify(currentStatus) !== JSON.stringify(lastStatus);
}

type ServerStatusResponse = {
  status: string;
  message: string;
};

export async function getCurrentStatus(server: ServerName): Promise<Status> {
  const logger = consola.withTag(`scraper-${server}`);

  try {
    const { status, message } = await $fetch<ServerStatusResponse>(STATUS_URLS[server], {
      responseType: "json",
    });
    logger.log(`Have current status here: ${status} ${message}`);
    return {
      type: sanitizeStatus(status) as StatusType,
      message: sanitizeMessage(message),
    };
  } catch (e) {
    const isStatus = typeof e === "object" && e && "data" in e;

    if (!isStatus) {
      logger.error("Could not fetch current server status");
      logger.error(e);
      return FAILING_STATUS;
    }

    const { status, message } = e.data as ServerStatusResponse;

    return {
      type: sanitizeStatus(status) as StatusType,
      message: sanitizeMessage(message),
    };
  }
}

function sanitizeStatus(status: string) {
  const STATUS_OFFLINE_VALUES = [500, "500"];

  return STATUS_OFFLINE_VALUES.includes(status) ? "offline" : status;
}

function sanitizeMessage(rawMessage: string) {
  const lowerMessage = rawMessage.toLowerCase();

  const isOnline = lowerMessage.includes("is online");

  if (isOnline) {
    return lowerMessage;
  }

  const isTimeout = TIMEOUT_INDICATORS.some((s) => lowerMessage.includes(s));
  return isTimeout ? MESSAGES.timeout : lowerMessage;
}
