import fs from "fs/promises";
import { env } from "~/env.mjs";
import AppError from "~/utils/error";
import type { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
import { parseAdjustedWidgetConfig } from "../service/parseWidgetConfigService";
import type { WidgetRepository } from "./widgetRepository";

export class WidgetLocalFileRepository implements WidgetRepository {
  private file: string;

  constructor() {
    if (env.WIDGET_STORE !== "file") {
      throw new AppError("Widget store is not set to 'file'", null, true);
    }

    if (!env.REPO_FILE) {
      throw new AppError("Local file repo path not set", null, true);
    }

    this.file = env.REPO_FILE;
  }

  async get(): Promise<AdjustedWidgetConfig[]> {
    try {
      const fileContents = await fs.readFile(this.file);
      const response = JSON.parse(fileContents.toString());

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
      throw new AppError("Cannot get widget config through redis", error, true);
    }
  }

  async set(widgets: AdjustedWidgetConfig[]): Promise<void> {
    try {
      await fs.writeFile(this.file, JSON.stringify(widgets));
    } catch (error) {
      throw new AppError(
        "Cannot set widget config through local file",
        error,
        true,
      );
    }
  }
}