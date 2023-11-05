import { z } from "zod";
import { isObject, isString } from "~/utils/guards/base";
import { isFittingDataPaylod, isWidgetType } from "~/utils/guards/widgets";
import {
  calendarWidgetConfigSchema,
  linkWidgetConfigSchema,
  searchWidgetConfigSchema,
  timeWidgetConfigSchema,
  widgetTypeSchema,
} from "~/utils/schema";
import type { WidgetType } from "~/utils/types/widget";
import type { CalendarWidgetConfig } from "../widgets/calendar/types";
import type { LinkWidgetConfig } from "../widgets/links/types";
import type { SearchWidgetConfig } from "../widgets/search/types";
import type { TimeWidgetConfig } from "../widgets/time/types";

export class WidgetConfig {
  id: string;
  type: WidgetType;
  data:
    | LinkWidgetConfig
    | SearchWidgetConfig
    | CalendarWidgetConfig
    | TimeWidgetConfig;

  constructor(
    id: string,
    type: WidgetType,
    data:
      | LinkWidgetConfig
      | SearchWidgetConfig
      | CalendarWidgetConfig
      | TimeWidgetConfig,
  ) {
    this.id = id;
    this.type = type;
    this.data = data;
  }

  static validate(input: unknown): input is WidgetConfig {
    if (!isObject(input)) {
      return false;
    }
    if (!isString(input.id)) {
      return false;
    }
    if (!isWidgetType(input.type)) {
      return false;
    }
    if (!isFittingDataPaylod(input.data, input.type)) {
      return false;
    }

    return true;
  }

  static getSchema() {
    const widgetConfigSchema = z.object({
      id: z.string(),
      type: widgetTypeSchema,
      data: linkWidgetConfigSchema
        .or(searchWidgetConfigSchema)
        .or(timeWidgetConfigSchema)
        .or(calendarWidgetConfigSchema),
    });

    return widgetConfigSchema;
  }
}
