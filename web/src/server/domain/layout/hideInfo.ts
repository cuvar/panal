import { z } from "zod";
import { isBoolean, isObject } from "~/lib/guards/base";
import { isScreenSize } from "~/lib/guards/other";
import { screenSizeSchema } from "~/lib/types/schema";
import type { ScreenSize } from "~/lib/types/types";
import { AdjustedWidgetLayout } from "./adjustedWidgetLayout";

export class HideInfo {
  widget: AdjustedWidgetLayout;
  screenSize: ScreenSize;
  hide: boolean;

  constructor(
    widget: AdjustedWidgetLayout,
    screenSize: ScreenSize,
    hide: boolean,
  ) {
    this.widget = widget;
    this.screenSize = screenSize;
    this.hide = hide;
  }

  static validate(input: unknown): input is HideInfo {
    if (!isObject(input)) {
      return false;
    }
    if (!AdjustedWidgetLayout.validate(input.widget)) {
      return false;
    }
    if (!isScreenSize(input.screenSize)) {
      return false;
    }
    if (!isBoolean(input.hide)) {
      return false;
    }
    return true;
  }

  static getSchema() {
    const schema = z.object({
      widget: AdjustedWidgetLayout.getSchema(),
      screenSize: screenSizeSchema,
      hide: z.boolean(),
    });

    return schema;
  }
}
