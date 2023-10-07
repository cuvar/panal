import { z } from "zod";
import { isObject, isString } from "~/utils/guards/base";
import {
  isFittingDataPaylod,
  isScreenSizePositioning,
  isWidgetType,
} from "~/utils/guards/widgets";
import {
  calendarWidgetConfigSchema,
  linkWidgetConfigSchema,
  screenSizePositioningSchema,
  searchWidgetConfigSchema,
  timeWidgetConfigSchema,
  widgetTypeSchema,
} from "~/utils/schema";
import type { ScreenSize } from "~/utils/types/types";
import type { ScreenSizePositioning, WidgetType } from "~/utils/types/widget";
import type { CalendarWidgetConfig } from "../widgets/calendar/types";
import type { LinkWidgetConfig } from "../widgets/links/types";
import type { SearchWidgetConfig } from "../widgets/search/types";
import type { TimeWidgetConfig } from "../widgets/time/types";

export class AdjustedWidgetConfig {
  id: string;
  layout: ScreenSizePositioning;
  type: WidgetType;
  data:
    | LinkWidgetConfig
    | SearchWidgetConfig
    | CalendarWidgetConfig
    | TimeWidgetConfig;

  constructor(
    id: string,
    type: WidgetType,
    layout: ScreenSizePositioning,
    data:
      | LinkWidgetConfig
      | SearchWidgetConfig
      | CalendarWidgetConfig
      | TimeWidgetConfig,
  ) {
    this.id = id;
    this.layout = layout;
    this.type = type;
    this.data = data;
  }

  static validate(input: unknown): input is AdjustedWidgetConfig {
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
    if (!isFittingDataPaylod(input.data, input.type)) {
      return false;
    }

    return true;
  }

  static getSchema() {
    const adjustedWidgetConfigSchema = z.object({
      id: z.string(),
      type: widgetTypeSchema,
      layout: screenSizePositioningSchema,
      data: linkWidgetConfigSchema
        .or(searchWidgetConfigSchema)
        .or(timeWidgetConfigSchema)
        .or(calendarWidgetConfigSchema),
    });

    return adjustedWidgetConfigSchema;
  }

  setLayout(
    breakpoint: ScreenSize,
    layout: ScreenSizePositioning[typeof breakpoint],
  ) {
    this.layout[breakpoint] = layout;
  }
}
