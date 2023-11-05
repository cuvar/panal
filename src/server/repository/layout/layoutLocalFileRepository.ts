import { env } from "~/env.mjs";
import { REPO_LAYOUT_FILE } from "~/utils/const";
import AppError from "~/utils/error";
import { type Reader } from "../../driver/Reader/Reader";
import type { AdjustedWidgetLayout } from "../../entities/adjustedWidgetLayout";
import { parseAdjustedWidgetLayout } from "../../service/parseWidgetConfigService";
import type { LayoutRepository } from "./layoutRepository";

export class LayoutLocalFileRepository implements LayoutRepository {
  private file: string;
  private reader: Reader;

  constructor(reader: Reader) {
    if (env.WIDGET_STORE !== "file") {
      throw new AppError("Widget store is not set to 'file'", null, true);
    }

    this.file = REPO_LAYOUT_FILE;
    this.reader = reader;
  }

  async getAll(): Promise<AdjustedWidgetLayout[]> {
    try {
      const fileContents = await this.reader.read(this.file);
      const response = JSON.parse(fileContents);

      if (!response) {
        throw new AppError("No widgets found", null, true);
      }
      if (typeof response !== "object") {
        throw new AppError("Invalid response from local file", null, true);
      }
      const config = parseAdjustedWidgetLayout(JSON.stringify(response));
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

  async get(id: string): Promise<AdjustedWidgetLayout> {
    try {
      const data = await this.getAll();
      const res = data.find((d) => d.id == id);
      if (!res) {
        throw new AppError(`No widget config for id ${id}`);
      }
      return res;
    } catch (error) {
      throw new AppError(
        "Cannot get widget layout through local file",
        error,
        true,
      );
    }
  }

  async set(widgets: AdjustedWidgetLayout[]): Promise<void> {
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
