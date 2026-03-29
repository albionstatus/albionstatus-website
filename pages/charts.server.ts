import { defineHandler, defineHead } from "void";
import { subDays } from "date-fns";
import { getPastStatuses } from "../src/db.js";
import type { StatusApiResponse } from "./_data/types.js";

export interface Props {
  initialChartData: StatusApiResponse[];
}

export const loader = defineHandler<Props>(async () => {
  const since = subDays(new Date(), 1);
  const result = await getPastStatuses("ams", since);
  return { initialChartData: (result || []) as StatusApiResponse[] };
});

export const head = defineHead(() => ({
  title: "Albion Uptime Charts",
  meta: [
    {
      name: "description",
      content:
        "See how many Albion server outage have happened in the last 24 hours in our dynamic uptime charts",
    },
  ],
}));
