import AppError from "~/utils/error";
import type { Fetcher } from "./Fetcher";

export class ICSFetcher implements Fetcher {
  async fetch(url: string): Promise<string> {
    try {
      const res = await fetch(url).then((res) => res.text());
      return res;
    } catch (error) {
      throw new AppError("Cannot fetch ICS file", error);
    }
  }
}
