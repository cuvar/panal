import { Redis } from "@upstash/redis";
import { env } from "~/env.mjs";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import MongoDatabase, { WidgetModel } from "~/server/driver/Database/mongodb";
import { WidgetTypeHelper, type WidgetType } from "../../config/widgetType";
import type { AdjustedWidgetLayout } from "../adjustedWidgetLayout";
import { parseAdjustedWidgetLayout } from "../services/parse.service";
import { type ILayoutRepository } from "./layoutRepository";

export class LayoutMongoRepository implements ILayoutRepository {
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

  async init(): Promise<void> {
    await MongoDatabase.instance.initialize();
  }

  async get(id: string): Promise<AdjustedWidgetLayout> {
    try {
      const data = await WidgetModel.findById(id).exec();

      if (!data) {
        throw new AppError(codes.WIDGET_NOT_FOUND);
      }

      if (!WidgetTypeHelper.validate(data.type)) {
        throw new AppError(codes.VALIDATION_WIDGETTYPE_FAILED);
      }

      const awl: AdjustedWidgetLayout = {
        id: data.id as string,
        layout: data.layout,
        type: data.type as WidgetType,
      };

      return awl;
    } catch (error) {
      throw new AppError(codes.REPOSITORY_GET_LAYOUT_FAILED, error);
    }
  }

  async getAll(): Promise<AdjustedWidgetLayout[]> {
    try {
      const response = await WidgetModel.find().exec();

      const data = response.map((e) => {
        if (!WidgetTypeHelper.validate(e.type)) {
          throw new AppError(codes.VALIDATION_WIDGETTYPE_FAILED);
        }

        return {
          id: e.id as string,
          layout: e.layout,
          type: e.type as WidgetType,
        };
      });
      const config = parseAdjustedWidgetLayout(JSON.stringify(data));
      if (!config) {
        throw new AppError(codes.WIDGET_LAYOUT_INVALID);
      }

      return config;
    } catch (error) {
      throw new AppError(codes.REPOSITORY_GET_ALL_LAYOUT_FAILED, error);
    }
  }

  async set(id: string, widget: AdjustedWidgetLayout): Promise<void> {
    try {
      await WidgetModel.updateOne(
        { id: widget.id },
        {
          layout: widget.layout,
          id: id,
          type: widget.type,
        },
      ).exec();
    } catch (error) {
      throw new AppError(codes.REPOSITORY_SET_LAYOUT_FAILED, error);
    }
  }

  async setAll(widgets: AdjustedWidgetLayout[]): Promise<void> {
    try {
      const pUpdates = widgets.map(async (widget) => {
        return WidgetModel.updateOne(
          { id: widget.id },
          {
            layout: widget.layout,
            id: widget.id,
            type: widget.type,
          },
        ).exec();
      });

      await Promise.all(pUpdates);
    } catch (error) {
      throw new AppError(codes.REPOSITORY_SET_ALL_LAYOUT_FAILED, error);
    }
  }
}
