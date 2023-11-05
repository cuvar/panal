import { z } from "zod";
import AppError from "~/utils/error";
import { isObject, isString } from "~/utils/guards/base";
import { isScreenSizePositioning } from "~/utils/guards/widgets";
import { screenSizePositioningSchema } from "~/utils/schema";
import type { ScreenSize } from "~/utils/types/types";
import type { ScreenSizePositioning, WidgetType } from "~/utils/types/widget";
import {
  getConfigRepository,
  type ConfigRepository,
} from "../repository/config/configRepository";

export class AdjustedWidgetLayout {
  id: string;
  layout: ScreenSizePositioning;
  _type: WidgetType | null;

  constructor(id: string, layout: ScreenSizePositioning) {
    this.id = id;
    this.layout = layout;
    this._type = null;
  }

  static validate(input: unknown): input is AdjustedWidgetLayout {
    if (!isObject(input)) {
      return false;
    }
    if (!isString(input.id)) {
      return false;
    }
    if (!isScreenSizePositioning(input.layout)) {
      return false;
    }
    return true;
  }

  static getSchema() {
    const adjustedWidgetConfigSchema = z.object({
      id: z.string(),
      layout: screenSizePositioningSchema,
    });

    return adjustedWidgetConfigSchema;
  }

  setLayout(
    breakpoint: ScreenSize,
    layout: ScreenSizePositioning[typeof breakpoint],
  ) {
    this.layout[breakpoint] = layout;
  }

  async getType() {
    if (!this._type) {
      this._type = await this._retrieveType(getConfigRepository());
    }
    return this._type;
  }

  async _retrieveType(repo: ConfigRepository): Promise<WidgetType> {
    const res = await repo.get(this.id);
    if (!res) {
      throw new AppError(`Cannot fetch type for id ${this.id}`);
    }

    return res.type;
  }
}
