import { Redis } from "@upstash/redis";
import { env } from "~/env.mjs";
import AppError from "~/lib/error/error";
import { WidgetConfig } from "~/server/domain/config/widgetConfig";
import { UPSTASH_PREFIX, UPSTASH_WIDGET_PREFIX } from "~/lib/basic/const";
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
    const key = UPSTASH_PREFIX + UPSTASH_WIDGET_PREFIX + id;

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

  async getAll(): Promise<WidgetConfig[]> {
    const key = UPSTASH_PREFIX + UPSTASH_WIDGET_PREFIX;

    try {
      const keys = await this.getKeysWithPrefix(key);
      const response = await this.redis.mget(...keys);

      if (!response) {
        throw new AppError("No widgets found", null, true);
      }
      if (!Array.isArray(response)) {
        throw new AppError("Invalid response from Upstash", null, true);
      }
      if (!WidgetConfig.isWidgetConfigArray(response)) {
        throw new AppError("Invalid widget config", null, true);
      }

      const mapped = response.map((r) => {
        return new WidgetConfig(r.id, r.type, r.data);
      });

      return mapped;
    } catch (error) {
      throw new AppError("Cannot get widget config through redis", error, true);
    }
  }

  async set(id: string, data: WidgetConfig): Promise<void> {
    const key = UPSTASH_PREFIX + UPSTASH_WIDGET_PREFIX + id;

    try {
      await this.redis.set(key, JSON.stringify(data));
    } catch (error) {
      throw new AppError("Cannot set widget config through redis", error, true);
    }
  }

  async setAll(data: WidgetConfig[]): Promise<void> {
    for (const config of data) {
      const key = UPSTASH_PREFIX + UPSTASH_WIDGET_PREFIX + config.id;
      try {
        await this.redis.set(key, JSON.stringify(data));
      } catch (error) {
        throw new AppError(
          "Cannot set all widget configs through redis",
          error,
          true,
        );
      }
    }
  }

  async getKeysWithPrefix(prefix: string) {
    let cursor = 0;
    const keys: string[] = [];
    const pattern = `${prefix}*`;

    do {
      const result = await this.redis.scan(cursor, {
        match: pattern,
      });

      cursor = +result[0];
      keys.push(...result[1]);
    } while (cursor !== 0);

    return keys;
  }
}
