import { z } from "zod";
import { isBoolean, isObject } from "~/lib/guards/base";
import { type ScreenSize, ScreenSizeHelper } from "../other/screenSize";
import {
  type AdjustedWidgetLayout,
  AdjustedWidgetLayoutHelper,
} from "./adjustedWidgetLayout";

export type WidgetVisibility = {
  widget: AdjustedWidgetLayout;
  screenSize: ScreenSize;
  visible: boolean;
};
export const WidgetVisibilityHelper = {
  validate(input: unknown): input is WidgetVisibility {
    if (!isObject(input)) {
      return false;
    }
    if (!AdjustedWidgetLayoutHelper.validate(input.widget)) {
      return false;
    }
    if (!ScreenSizeHelper.validate(input.screenSize)) {
      return false;
    }
    if (!isBoolean(input.hide)) {
      return false;
    }
    return true;
  },
  getSchema() {
    const schema = z.object({
      widget: AdjustedWidgetLayoutHelper.getSchema(),
      screenSize: ScreenSizeHelper.getSchema(),
      visible: z.boolean(),
    });

    return schema;
  },
};
