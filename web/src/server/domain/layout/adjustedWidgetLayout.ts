import { z } from "zod";
import { isObject, isString } from "~/lib/guards/base";
import {
  WidgetTypeHelper,
  type WidgetType,
} from "~/server/domain/config/widgetType";
import {
  ScreenSizePositioningHelper,
  type ScreenSizePositioning,
} from "./screensizePositioning";

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
    if (!WidgetTypeHelper.validate(input.type)) {
      return false;
    }
    if (!ScreenSizePositioningHelper.validate(input.layout)) {
      return false;
    }
    return true;
  },

  getSchema() {
    const adjustedWidgetLayoutSchema = z.object({
      id: z.string(),
      type: WidgetTypeHelper.getSchema(),
      layout: ScreenSizePositioningHelper.getSchema(),
    });

    return adjustedWidgetLayoutSchema;
  },
};
