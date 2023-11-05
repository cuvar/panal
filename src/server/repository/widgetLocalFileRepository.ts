import { env } from "~/env.mjs";
import { REPO_LAYOUT_FILE } from "~/utils/const";
import AppError from "~/utils/error";
import { type Reader } from "../driver/Reader/Reader";
import type { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
import { parseAdjustedWidgetConfig } from "../service/parseWidgetConfigService";
import type { WidgetRepository } from "./widgetRepository";

export class WidgetLocalFileRepository implements WidgetRepository {
  private file: string;
  private reader: Reader;

  constructor(reader: Reader) {
    if (env.WIDGET_STORE !== "file") {
      throw new AppError("Widget store is not set to 'file'", null, true);
    }

    this.file = REPO_LAYOUT_FILE;
    this.reader = reader;
  }

  async get(): Promise<AdjustedWidgetConfig[]> {
    try {
      const fileContents = await this.reader.read(this.file);
      const response = JSON.parse(fileContents);

      if (!response) {
        throw new AppError("No widgets found", null, true);
      }
      if (typeof response !== "object") {
        throw new AppError("Invalid response from local file", null, true);
      }
      const config = parseAdjustedWidgetConfig(JSON.stringify(response));
      if (!config) {
        throw new AppError("Invalid widget config", null, true);
      }

      return config;
    } catch (error) {
      throw new AppError(
        "Cannot get widget config through local file",
        error,
        true,
      );
    }
  }

  async set(widgets: AdjustedWidgetConfig[]): Promise<void> {
    try {
      await this.reader.write(this.file, JSON.stringify(widgets));
    } catch (error) {
      throw new AppError(
        "Cannot set widget config through local file",
        error,
        true,
      );
    }
  }
}
