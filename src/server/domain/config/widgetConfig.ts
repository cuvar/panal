import { z } from "zod";
import { isObject, isString } from "~/lib/guards/base";
import { isFittingDataPaylod, isWidgetType } from "~/lib/guards/widgets";
import type { WidgetType } from "~/lib/types/widget";
import { widgetTypeSchema } from "~/utils/schema";
import { calendarWidgetConfigSchema } from "../../widgets/calendar/schema";
import type { CalendarWidgetConfig } from "../../widgets/calendar/types";
import { linkWidgetConfigSchema } from "../../widgets/links/schema";
import type { LinkWidgetConfig } from "../../widgets/links/types";
import { searchWidgetConfigSchema } from "../../widgets/search/schema";
import type { SearchWidgetConfig } from "../../widgets/search/types";
import { timeWidgetConfigSchema } from "../../widgets/time/schema";
import type { TimeWidgetConfig } from "../../widgets/time/types";

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

  /**
   * Checks whether data is of type WidgetConfig[]
   * @param {unknown} data Unkown type to be checked
   * @returns {boolean} Whether data is of type WidgetConfig[]
   */
  static isWidgetConfigArray(data: unknown): data is WidgetConfig[] {
    if (!Array.isArray(data)) {
      return false;
    }
    if (!data.every((r) => WidgetConfig.validate(r))) {
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
