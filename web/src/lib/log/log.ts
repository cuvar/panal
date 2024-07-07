import { env } from "~/env.mjs";

type Logtype = "log" | "info" | "warn" | "error";

/**
 * Logs information to the console
 * @param msg Message to log
 * @param type Type of log
 * @param {...any} args
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Log(msg: any, type: Logtype = "log", ...args: any[]) {
  if (
    process.env.NODE_ENV !== "production" ||
    env.NEXT_PUBLIC_PANAL_DEBUG == "true"
  ) {
    switch (type) {
      case "log":
        console.log(msg, args);
        break;
      case "info":
        console.info(msg, args);
        break;
      case "warn":
        console.warn(msg, args);
        break;
      case "error":
        console.error(msg, args);
        break;
    }
  }
}
