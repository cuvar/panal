import { env } from "~/env.mjs";
import { REPO_CONFIG_FILE } from "~/lib/basic/const";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import { parseWidgetConfigArray } from "~/server/domain/config/services/parse.service";
import { type WidgetConfig } from "~/server/domain/config/widgetConfig";
import { type Reader } from "~/server/driver/Reader/Reader";
import { type ConfigRepository } from "./configRepository";

export class ConfigLocalFileRepository implements ConfigRepository {
  private file: string;
  private reader: Reader;

  constructor(reader: Reader) {
    if (env.WIDGET_STORE !== "file") {
      throw new AppError(codes.REPOSITORY_WRONG_CONFIGURATION);
    }

    this.file = REPO_CONFIG_FILE;
    this.reader = reader;
  }

  async get(id: string): Promise<WidgetConfig> {
    try {
      const fileContents = await this.reader.read(this.file);
      const response = JSON.parse(fileContents);

      if (!response) {
        throw new AppError(codes.WIDGET_NONE_FOUND);
      }
      if (typeof response !== "object") {
        throw new AppError(codes.REPOSITORY_INVALID_RESPONSE);
      }

      const config = parseWidgetConfigArray(JSON.stringify(response));
      if (!config) {
        throw new AppError(codes.WIDGET_CONFIG_INVALID);
      }

      const foundItem = config.find((c) => c.id === id);
      if (!foundItem) {
        throw new AppError(codes.WIDGET_CONFIG_MISSING);
      }

      return foundItem;
    } catch (error) {
      throw new AppError(codes.REPOSITORY_GET_CONFIG_FAILED, error);
    }
  }

  async getAll(): Promise<WidgetConfig[]> {
    try {
      const fileContents = await this.reader.read(this.file);
      const response = JSON.parse(fileContents);

      if (!response) {
        throw new AppError(codes.WIDGET_NONE_FOUND);
      }
      if (typeof response !== "object") {
        throw new AppError(codes.REPOSITORY_INVALID_RESPONSE);
      }

      const config = parseWidgetConfigArray(JSON.stringify(response));
      if (!config) {
        throw new AppError(codes.WIDGET_CONFIG_INVALID);
      }

      return config;
    } catch (error) {
      throw new AppError(codes.REPOSITORY_GET_ALL_CONFIG_FAILED, error);
    }
  }

  async set(id: string, data: WidgetConfig): Promise<void> {
    try {
      const fileContents = await this.reader.read(this.file);
      const response = JSON.parse(fileContents);

      if (!response) {
        throw new AppError(codes.WIDGET_NONE_FOUND);
      }
      if (typeof response !== "object") {
        throw new AppError(codes.REPOSITORY_INVALID_RESPONSE);
      }

      const currentConfig = parseWidgetConfigArray(JSON.stringify(response));
      if (!currentConfig) {
        throw new AppError(codes.WIDGET_CONFIG_INVALID);
      }

      const foundItem = currentConfig.find((c) => c.id === id);
      if (foundItem) {
        foundItem.data = data.data;
      } else {
        currentConfig.push(data);
      }

      await this.reader.write(this.file, JSON.stringify(currentConfig));
    } catch (error) {
      throw new AppError(codes.REPOSITORY_SET_CONFIG_FAILED, error);
    }
  }

  async setAll(data: WidgetConfig[]): Promise<void> {
    try {
      await this.reader.write(this.file, JSON.stringify(data));
    } catch (error) {
      throw new AppError(codes.REPOSITORY_SET_ALL_CONFIG_FAILED, error);
    }
  }
}
