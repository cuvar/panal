import { Redis } from "@upstash/redis";
import { env } from "~/env.mjs";
import { UPSTASH_PREFIX, UPSTASH_WIDGET_PREFIX } from "~/lib/basic/const";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import {
  type WidgetConfig,
  WidgetConfigHelper,
} from "~/server/domain/config/widgetConfig";
import { type IConfigRepository } from "./configRepository";

export class ConfigUpstashRepository implements IConfigRepository {
  private redis;

  constructor() {
    if (env.WIDGET_STORE !== "upstash") {
      throw new AppError(codes.REPOSITORY_WRONG_CONFIGURATION);
    }

    if (!env.UPSTASH_ENDPOINT || !env.UPSTASH_TOKEN) {
      throw new AppError(codes.REPOSITORY_MISSING_CREDENTIALS);
    }

    this.redis = new Redis({
      url: env.UPSTASH_ENDPOINT,
      token: env.UPSTASH_TOKEN,
    });
  }

  async init() {
    // not needed
  }

  async get(id: string): Promise<WidgetConfig> {
    const key = UPSTASH_PREFIX + UPSTASH_WIDGET_PREFIX + id;

    try {
      const response = await this.redis.get(key);
      if (!response) {
        throw new AppError(codes.WIDGET_NONE_FOUND);
      }
      if (typeof response !== "object") {
        throw new AppError(codes.REPOSITORY_INVALID_RESPONSE);
      }
      if (!WidgetConfigHelper.validate(response)) {
        throw new AppError(codes.WIDGET_CONFIG_INVALID);
      }
      return {
        id: response.id,
        type: response.type,
        data: response.data,
      } as WidgetConfig;
    } catch (error) {
      throw new AppError(codes.REPOSITORY_GET_CONFIG_FAILED, error);
    }
  }

  async getAll(): Promise<WidgetConfig[]> {
    const key = UPSTASH_PREFIX + UPSTASH_WIDGET_PREFIX;

    try {
      const keys = await this.getKeysWithPrefix(key);
      const response = await this.redis.mget(...keys);

      if (!response) {
        throw new AppError(codes.WIDGET_NONE_FOUND);
      }
      if (!Array.isArray(response)) {
        throw new AppError(codes.REPOSITORY_INVALID_RESPONSE);
      }
      if (!WidgetConfigHelper.isWidgetConfigArray(response)) {
        throw new AppError(codes.WIDGET_CONFIG_INVALID);
      }

      const mapped = response.map((r) => {
        return { id: r.id, type: r.type, data: r.data } as WidgetConfig;
      });

      return mapped;
    } catch (error) {
      throw new AppError(codes.REPOSITORY_GET_ALL_CONFIG_FAILED, error);
    }
  }

  async set(id: string, data: WidgetConfig): Promise<void> {
    const key = UPSTASH_PREFIX + UPSTASH_WIDGET_PREFIX + id;

    try {
      await this.redis.set(key, JSON.stringify(data));
    } catch (error) {
      throw new AppError(codes.REPOSITORY_SET_CONFIG_FAILED, error);
    }
  }

  async setAll(data: WidgetConfig[]): Promise<void> {
    for (const config of data) {
      const key = UPSTASH_PREFIX + UPSTASH_WIDGET_PREFIX + config.id;
      try {
        await this.redis.set(key, JSON.stringify(data));
      } catch (error) {
        throw new AppError(codes.REPOSITORY_SET_ALL_CONFIG_FAILED, error);
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
