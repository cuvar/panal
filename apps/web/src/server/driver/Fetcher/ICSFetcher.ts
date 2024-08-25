import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import type { Fetcher } from "./Fetcher";

export class ICSFetcher implements Fetcher {
  async fetch(url: string): Promise<string> {
    try {
      const res = await fetch(url).then((res) => res.text());
      return res;
    } catch (error) {
      throw new AppError(codes.WIDGET_CAL_ICS_FETCH_FAILED, error);
    }
  }
}
