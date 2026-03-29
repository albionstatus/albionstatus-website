import { defineHandler, defineHead } from "void";
import type { Status } from "../src/types.js";
import { getLastStatus } from "../src/db.js";

export interface Props {
  statusWas: Status;
  statusSgp: Status;
  statusAms: Status;
}

export const loader = defineHandler<Props>(async () => {
  const [statusWas, statusSgp, statusAms] = await Promise.all([
    getLastStatus("was"),
    getLastStatus("sgp"),
    getLastStatus("ams"),
  ]);
  return { statusWas, statusSgp, statusAms };
});

export const head = defineHead(() => ({
  title: "AlbionStatus - Is Albion Down?",
  meta: [
    {
      name: "description",
      content:
        "AlbionStatus is the only reliable Albion Online server status tracker. Find out if Albion is down in a splitsecond, no matter if the downtime is caused by the daily maintenance or an outage.",
    },
  ],
}));
