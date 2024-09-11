import { Redis } from "@upstash/redis";
import { env } from "~/env.mjs";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import {
  type WidgetConfig,
  WidgetConfigHelper,
} from "~/server/domain/config/widgetConfig";
import { WidgetModel } from "~/server/driver/Database/mongodb";
import { type WidgetType, WidgetTypeHelper } from "../widgetType";
import { type IConfigRepository } from "./configRepository";

export class ConfigMongoRepository implements IConfigRepository {
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
    // TODO: implement
  }

  async get(id: string): Promise<WidgetConfig> {
    try {
      const data = await WidgetModel.findById(id).exec();

      if (!data) {
        throw new AppError(codes.WIDGET_NOT_FOUND);
      }

      if (!WidgetTypeHelper.validate(data.type)) {
        throw new AppError(codes.VALIDATION_WIDGETTYPE_FAILED);
      }

      const config = {
        id: data.id as string,
        config: data.config as object,
        type: data.type as WidgetType,
      };

      if (!WidgetConfigHelper.validate(config)) {
        throw new AppError(codes.WIDGET_CONFIG_INVALID);
      }
      return config as WidgetConfig;
    } catch (error) {
      throw new AppError(codes.REPOSITORY_GET_CONFIG_FAILED, error);
    }
  }

  async getAll(): Promise<WidgetConfig[]> {
    try {
      const response = await WidgetModel.find().exec();

      const data = response.map((e) => {
        if (!WidgetTypeHelper.validate(e.type)) {
          throw new AppError(codes.VALIDATION_WIDGETTYPE_FAILED);
        }

        return {
          id: e.id as string,
          data: e.config as object,
          type: e.type as WidgetType,
        } satisfies WidgetConfig;
      });

      if (!WidgetConfigHelper.isWidgetConfigArray(data)) {
        throw new AppError(codes.WIDGET_CONFIG_INVALID);
      }

      return data;
    } catch (error) {
      throw new AppError(codes.REPOSITORY_GET_ALL_CONFIG_FAILED, error);
    }
  }

  async set(id: string, widget: WidgetConfig): Promise<void> {
    try {
      await WidgetModel.updateOne(
        { id: id },
        {
          id: id,
          data: widget.data,
          type: widget.type,
        },
      ).exec();
    } catch (error) {
      throw new AppError(codes.REPOSITORY_SET_CONFIG_FAILED, error);
    }
  }

  async setAll(data: WidgetConfig[]): Promise<void> {
    try {
      const pUpdates = data.map(async (widget) => {
        return WidgetModel.updateOne(
          { id: widget.id },
          {
            id: widget.id,
            data: widget.data,
            type: widget.type,
          },
        ).exec();
      });
      await Promise.all(pUpdates);
    } catch (error) {
      throw new AppError(codes.REPOSITORY_SET_ALL_CONFIG_FAILED, error);
    }
  }
}
