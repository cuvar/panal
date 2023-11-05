import { env } from "~/env.mjs";
import { type Reader } from "~/server/driver/Reader/Reader";
import { type WidgetConfig } from "~/server/entities/widgetConfig";
import { parseWidgetConfigArray } from "~/server/service/parseWidgetConfigService";
import { REPO_CONFIG_FILE } from "~/utils/const";
import AppError from "~/utils/error";
import { type ConfigRepository } from "./configRepository";

export class ConfigLocalFileRepository implements ConfigRepository {
  private file: string;
  private reader: Reader;

  constructor(reader: Reader) {
    if (env.WIDGET_STORE !== "file") {
      throw new AppError("Widget store is not set to 'file'", null, true);
    }

    this.file = REPO_CONFIG_FILE;
    this.reader = reader;
  }

  async get(id: string): Promise<WidgetConfig> {
    try {
      const fileContents = await this.reader.read(this.file);
      const response = JSON.parse(fileContents);

      if (!response) {
        throw new AppError("No widgets found", null, true);
      }
      if (typeof response !== "object") {
        throw new AppError("Invalid response from local file", null, true);
      }

      const config = parseWidgetConfigArray(JSON.stringify(response));
      if (!config) {
        throw new AppError("Invalid widget config", null, true);
      }

      const foundItem = config.find((c) => c.id === id);
      if (!foundItem) {
        throw new AppError(`No widget config for id ${id}`, null, true);
      }

      return foundItem;
    } catch (error) {
      throw new AppError("Cannot get widget config through redis", error, true);
    }
  }

  async set(id: string, data: WidgetConfig): Promise<void> {
    try {
      const response = await this.reader.read(this.file);
      if (!response) {
        throw new AppError("No widgets found", null, true);
      }
      if (typeof response !== "object") {
        throw new AppError("Invalid response from local file", null, true);
      }

      const currentConfig = parseWidgetConfigArray(JSON.stringify(response));
      if (!currentConfig) {
        throw new AppError("Invalid widget config", null, true);
      }

      const foundItem = currentConfig.find((c) => c.id === id);
      if (foundItem) {
        foundItem.data = data.data;
      } else {
        currentConfig.push(data);
      }

      await this.reader.write(this.file, JSON.stringify(currentConfig));
    } catch (error) {
      throw new AppError(
        "Cannot set widget config through local file",
        error,
        true,
      );
    }
  }
}
