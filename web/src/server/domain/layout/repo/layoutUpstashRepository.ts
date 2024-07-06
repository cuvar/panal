import { Redis } from "@upstash/redis";
import { env } from "~/env.mjs";
import { UPSTASH_LAYOUT_KEY } from "~/lib/basic/const";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import { parseAdjustedWidgetLayout } from "../../config/services/parseWidgetConfigService";
import type { AdjustedWidgetLayout } from "../adjustedWidgetLayout";
import type { LayoutRepository } from "./layoutRepository";

export class LayoutUpstashRepository implements LayoutRepository {
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

  async get(id: string): Promise<AdjustedWidgetLayout> {
    try {
      const data = await this.getAll();
      const res = data.find((d) => d.id == id);
      if (!res) {
        throw new AppError(codes.WIDGET_NOT_FOUND);
      }
      return res;
    } catch (error) {
      throw new AppError(codes.REPOSITORY_GET_LAYOUT_FAILED, error);
    }
  }

  async getAll(): Promise<AdjustedWidgetLayout[]> {
    try {
      const response = await this.redis.get(UPSTASH_LAYOUT_KEY);
      if (!response) {
        throw new AppError(codes.WIDGET_NONE_FOUND);
      }
      if (typeof response !== "object") {
        throw new AppError(codes.REPOSITORY_INVALID_RESPONSE);
      }
      const config = parseAdjustedWidgetLayout(JSON.stringify(response));
      if (!config) {
        throw new AppError(codes.WIDGET_CONFIG_INVALID);
      }

      return config;
    } catch (error) {
      throw new AppError(codes.REPOSITORY_GET_ALL_LAYOUT_FAILED, error);
    }
  }

  async set(id: string, widget: AdjustedWidgetLayout): Promise<void> {
    try {
      const currentAll = await this.getAll();
      const currentConfig = currentAll.find((e) => e.id === id);
      if (!currentConfig) {
        throw new AppError(codes.WIDGET_NOT_FOUND);
      }

      currentConfig.layout = widget.layout;

      await this.redis.set(UPSTASH_LAYOUT_KEY, JSON.stringify(currentAll));
    } catch (error) {
      throw new AppError(codes.REPOSITORY_SET_LAYOUT_FAILED, error);
    }
  }

  // TODO: check if this works
  async setMany(widgets: AdjustedWidgetLayout[]): Promise<void> {
    try {
      const currentAll = await this.getAll();

      widgets.forEach((widget) => {
        const currentConfig = currentAll.find((e) => e.id === widget.id);
        if (!currentConfig) {
          throw new AppError(codes.WIDGET_NOT_FOUND);
        }
        currentConfig.layout = widget.layout;
      });

      await this.redis.set(UPSTASH_LAYOUT_KEY, JSON.stringify(currentAll));
    } catch (error) {
      throw new AppError(codes.REPOSITORY_SET_MANY_LAYOUT_FAILED, error);
    }
  }

  async setAll(widgets: AdjustedWidgetLayout[]): Promise<void> {
    try {
      await this.redis.set(UPSTASH_LAYOUT_KEY, JSON.stringify(widgets));
    } catch (error) {
      throw new AppError(codes.REPOSITORY_SET_ALL_LAYOUT_FAILED, error);
    }
  }
}
