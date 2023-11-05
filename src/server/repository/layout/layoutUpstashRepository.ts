import { Redis } from "@upstash/redis";
import { env } from "~/env.mjs";
import { UPSTASH_LAYOUT_KEY } from "~/utils/const";
import AppError from "~/utils/error";
import type { AdjustedWidgetLayout } from "../../entities/adjustedWidgetLayout";
import { parseAdjustedWidgetLayout } from "../../service/parseWidgetConfigService";
import type { LayoutRepository } from "./layoutRepository";

export class WidgetUpstashRepository implements LayoutRepository {
  private redis;

  constructor() {
    if (env.WIDGET_STORE !== "upstash") {
      throw new AppError("Widget store is not set to 'upstash'", null, true);
    }

    if (!env.UPSTASH_ENDPOINT || !env.UPSTASH_TOKEN) {
      throw new AppError("Upstash credentials are not set", null, true);
    }

    this.redis = new Redis({
      url: env.UPSTASH_ENDPOINT,
      token: env.UPSTASH_TOKEN,
    });
  }

  async get(): Promise<AdjustedWidgetLayout[]> {
    try {
      const response = await this.redis.get(UPSTASH_LAYOUT_KEY);
      if (!response) {
        throw new AppError("No widgets found", null, true);
      }
      if (typeof response !== "object") {
        throw new AppError("Invalid response from Upstash", null, true);
      }
      const config = parseAdjustedWidgetLayout(JSON.stringify(response));
      if (!config) {
        throw new AppError("Invalid widget config", null, true);
      }

      return config;
    } catch (error) {
      throw new AppError("Cannot get widget config through redis", error, true);
    }
  }

  async set(widgets: AdjustedWidgetLayout[]): Promise<void> {
    try {
      await this.redis.set(UPSTASH_LAYOUT_KEY, JSON.stringify(widgets));
    } catch (error) {
      throw new AppError("Cannot set widget config through redis", error, true);
    }
  }
}
