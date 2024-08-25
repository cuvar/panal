import { z } from "zod";
import { isBoolean, isObject } from "~/lib/guards/base";
import { isScreenSize } from "~/lib/guards/other";
import { screenSizeSchema } from "~/lib/types/schema";
import type { ScreenSize } from "~/lib/types/types";
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
    if (!isScreenSize(input.screenSize)) {
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
      screenSize: screenSizeSchema,
      visible: z.boolean(),
    });

    return schema;
  },
};
