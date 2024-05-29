import { Redis } from "@upstash/redis";
import { env } from "~/env.mjs";
import AppError from "~/lib/error/error";
import { UPSTASH_LAYOUT_KEY } from "~/lib/basic/const";
import { parseAdjustedWidgetLayout } from "../../config/services/parseWidgetConfigService";
import type { AdjustedWidgetLayout } from "../adjustedWidgetLayout";
import type { LayoutRepository } from "./layoutRepository";

export class LayoutUpstashRepository implements LayoutRepository {
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

  async get(id: string): Promise<AdjustedWidgetLayout> {
    try {
      const data = await this.getAll();
      const res = data.find((d) => d.id == id);
      if (!res) {
        throw new AppError(`No widget config for id ${id}`);
      }
      return res;
    } catch (error) {
      throw new AppError("Cannot get widget layout through redis", error, true);
    }
  }

  async getAll(): Promise<AdjustedWidgetLayout[]> {
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

  async set(id: string, widget: AdjustedWidgetLayout): Promise<void> {
    try {
      const currentAll = await this.getAll();
      const currentConfig = currentAll.find((e) => e.id === id);
      if (!currentConfig) {
        throw new AppError(`No widget with ID ${id}`);
      }

      currentConfig.layout = widget.layout;

      await this.redis.set(UPSTASH_LAYOUT_KEY, JSON.stringify(currentAll));
    } catch (error) {
      throw new AppError("Cannot set widget config through redis", error, true);
    }
  }

  async setAll(widgets: AdjustedWidgetLayout[]): Promise<void> {
    try {
      await this.redis.set(UPSTASH_LAYOUT_KEY, JSON.stringify(widgets));
    } catch (error) {
      throw new AppError("Cannot set widget config through redis", error, true);
    }
  }
}
