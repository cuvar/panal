import { env } from "~/env.mjs";

type Logtype = "log" | "info" | "warn" | "error";

/**
 * Logs information to the console
 * @param msg Message to log
 * @param type Type of log
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Log(msg: any, type: Logtype = "log") {
  if (
    process.env.NODE_ENV !== "production" ||
    env.NEXT_PUBLIC_PANAL_DEBUG == "true"
  ) {
    switch (type) {
      case "log":
        console.log(msg);
        break;
      case "info":
        console.info(msg);
        break;
      case "warn":
        console.warn(msg);
        break;
      case "error":
        console.error(msg);
        break;
    }
  }
}
