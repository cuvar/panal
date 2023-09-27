import { Redis } from "@upstash/redis";
import { env } from "~/env.mjs";
import parseWidgetConfig from "../service/parseWidgetConfigService";
import type { WidgetRepository } from "./widgetRepository";
import type { WidgetConfig } from "~/utils/types/widget";

export class WidgetUpstashRepository implements WidgetRepository {
  private redis;

  constructor() {
    if (env.WIDGET_STORE !== "upstash") {
      throw new Error("Widget store is not set to redis");
    }

    if (!env.UPSTASH_ENDPOINT || !env.UPSTASH_TOKEN || !env.UPSTASH_KEY) {
      throw new Error("Upstash credentials are not set");
    }

    this.redis = new Redis({
      url: env.UPSTASH_ENDPOINT,
      token: env.UPSTASH_TOKEN,
    });
  }

  async getWidgetsConfig(): Promise<WidgetConfig[]> {
    if (!env.UPSTASH_KEY) {
      throw new Error("UPSTASH_KEY is not set");
    }

    const response = await this.redis.get(env.UPSTASH_KEY);
    if (!response) {
      throw new Error("No widgets found");
    }
    if (typeof response !== "object") {
      throw new Error("Invalid response from Upstash");
    }
    const config = parseWidgetConfig(JSON.stringify(response));
    if (!config) {
      throw new Error("Invalid widget config");
    }

    return config;
  }

  async setWidgetsConfig(widgets: WidgetConfig[]): Promise<void> {
    if (!env.UPSTASH_KEY) {
      throw new Error("UPSTASH_KEY is not set");
    }

    await this.redis.set(env.UPSTASH_KEY, JSON.stringify(widgets));
  }
}
