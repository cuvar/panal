import { z } from "zod";
import { isObject, isString } from "~/utils/guards/base";
import { isScreenSizePositioning, isWidgetType } from "~/utils/guards/widgets";
import { screenSizePositioningSchema, widgetTypeSchema } from "~/utils/schema";
import type { ScreenSize } from "~/utils/types/types";
import type { ScreenSizePositioning, WidgetType } from "~/utils/types/widget";

export class AdjustedWidgetLayout {
  id: string;
  layout: ScreenSizePositioning;
  type: WidgetType;

  constructor(id: string, type: WidgetType, layout: ScreenSizePositioning) {
    this.id = id;
    this.type = type;
    this.layout = layout;
  }

  updateLayoutForScreen(layout: ScreenSizePositioning) {
    //
  }

  static validate(input: unknown): input is AdjustedWidgetLayout {
    if (!isObject(input)) {
      return false;
    }
    if (!isString(input.id)) {
      return false;
    }
    if (!isWidgetType(input.type)) {
      return false;
    }
    if (!isScreenSizePositioning(input.layout)) {
      return false;
    }
    return true;
  }

  static getSchema() {
    const adjustedWidgetLayoutSchema = z.object({
      id: z.string(),
      type: widgetTypeSchema,
      layout: screenSizePositioningSchema,
    });

    return adjustedWidgetLayoutSchema;
  }

  setLayout(
    breakpoint: ScreenSize,
    layout: ScreenSizePositioning[typeof breakpoint],
  ) {
    this.layout[breakpoint] = layout;
  }
}
