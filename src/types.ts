// TODO: REMOVE OLD NAMES
export const SERVER_NAMES = ["sgp", "ams", "was", "east", "west"] as const;
export type ServerName = (typeof SERVER_NAMES)[number];

export type StatusType = "online" | "offline" | "starting" | "unknown";
export type Status = {
  type: StatusType;
  message: string;
  comment?: string;
};
