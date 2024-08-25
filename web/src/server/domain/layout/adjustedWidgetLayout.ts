import { z } from "zod";
import { isObject, isString } from "~/lib/guards/base";
import { isScreenSizePositioning, isWidgetType } from "~/lib/guards/widgets";
import {
  screenSizePositioningSchema,
  widgetTypeSchema,
} from "~/lib/types/schema";
import type { ScreenSizePositioning, WidgetType } from "~/lib/types/widget";

export type AdjustedWidgetLayout = {
  id: string;
  layout: ScreenSizePositioning;
  type: WidgetType;
};

export const AdjustedWidgetLayoutHelper = {
  validate(input: unknown): input is AdjustedWidgetLayout {
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
  },

  getSchema() {
    const adjustedWidgetLayoutSchema = z.object({
      id: z.string(),
      type: widgetTypeSchema,
      layout: screenSizePositioningSchema,
    });

    return adjustedWidgetLayoutSchema;
  },
};
