import { Redis } from "@upstash/redis";
import { env } from "~/env.mjs";
import { WidgetConfig } from "~/server/entities/widgetConfig";
import { UPSTASH_PREFIX } from "~/utils/const";
import AppError from "~/utils/error";
import { type ConfigRepository } from "./configRepository";

export class ConfigUpstashRepository implements ConfigRepository {
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

  async get(id: string): Promise<WidgetConfig> {
    const key = UPSTASH_PREFIX + id;

    try {
      const response = await this.redis.get(key);
      if (!response) {
        throw new AppError("No widgets found", null, true);
      }
      if (typeof response !== "object") {
        throw new AppError("Invalid response from Upstash", null, true);
      }
      if (!WidgetConfig.validate(response)) {
        throw new AppError("Invalid widget config", null, true);
      }
      return new WidgetConfig(response.id, response.type, response.data);
    } catch (error) {
      throw new AppError("Cannot get widget config through redis", error, true);
    }
  }

  async set(id: string, data: WidgetConfig): Promise<void> {
    const key = UPSTASH_PREFIX + id;

    try {
      await this.redis.set(key, JSON.stringify(data));
    } catch (error) {
      throw new AppError("Cannot set widget config through redis", error, true);
    }
  }
}
