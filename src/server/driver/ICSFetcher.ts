import { env } from "~/env.mjs";
import type { Fetcher } from "./Fetcher";

export class ICSFetcher implements Fetcher {
  async fetch(url: string): Promise<string> {
    try {
      const res = await fetch(url).then((res) => res.text());
      return res;
    } catch (error) {
      if (env.NEXT_PUBLIC_PANAL_DEBUG == "false") {
        console.log(error);
      }
      throw error;
    }
  }
}
