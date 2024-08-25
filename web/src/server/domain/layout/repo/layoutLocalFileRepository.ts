import { env } from "~/env.mjs";
import { REPO_LAYOUT_FILE } from "~/lib/basic/const";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import { type Reader } from "../../../driver/Reader/Reader";
import { parseAdjustedWidgetLayout } from "../../config/services/parseWidgetConfig.service";
import type { AdjustedWidgetLayout } from "../adjustedWidgetLayout";
import type { LayoutRepository } from "./layoutRepository";

export class LayoutLocalFileRepository implements LayoutRepository {
  private file: string;
  private reader: Reader;

  constructor(reader: Reader) {
    if (env.WIDGET_STORE !== "file") {
      throw new AppError(codes.REPOSITORY_WRONG_CONFIGURATION);
    }

    this.file = REPO_LAYOUT_FILE;
    this.reader = reader;
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
      const content = await this._parseFileContent();
      if (!content) {
        throw new AppError(codes.WIDGET_NONE_FOUND);
      }
      if (typeof content !== "object") {
        throw new AppError(codes.REPOSITORY_INVALID_RESPONSE);
      }
      const config = parseAdjustedWidgetLayout(JSON.stringify(content));
      if (!config) {
        throw new AppError(codes.WIDGET_CONFIG_INVALID);
      }
      return config;
    } catch (error) {
      throw new AppError(codes.REPOSITORY_GET_ALL_LAYOUT_FAILED, error);
    }
  }

  async _parseFileContent() {
    try {
      const fileContents = await this.reader.read(this.file);
      if (!fileContents) {
        throw new AppError(codes.REPOSITORY_EMPTY_CONTENT);
      }
      const content = JSON.parse(fileContents);
      return content;
    } catch (error) {
      throw new AppError(codes.REPOSITORY_PARSE_FILE_CONTENT_FAILED, error);
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

      await this.reader.write(this.file, JSON.stringify(currentAll));
    } catch (error) {
      throw new AppError(codes.REPOSITORY_SET_LAYOUT_FAILED, error);
    }
  }

  async setAll(widgets: AdjustedWidgetLayout[]): Promise<void> {
    try {
      await this.reader.write(this.file, JSON.stringify(widgets));
    } catch (error) {
      throw new AppError(codes.REPOSITORY_SET_ALL_LAYOUT_FAILED, error);
    }
  }
}
