import { cors } from "hono/cors";

export default cors({ origin: "*", allowMethods: ["GET"] });
