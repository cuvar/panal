import { z } from "zod";
import { isObject, isString } from "~/lib/guards/base";
import {
  WidgetTypeHelper,
  type WidgetType,
} from "~/server/domain/config/widgetType";
import { isCalendarWidgetConfig } from "~/server/widgets/calendar/guards";
import { isLinkWidgetConfig } from "~/server/widgets/links/guards";
import { isSearchWidgetConfig } from "~/server/widgets/search/guards";
import { isTimeWidgetConfig } from "~/server/widgets/time/guards";
import { calendarWidgetConfigSchema } from "../../widgets/calendar/schema";
import type { CalendarWidgetConfig } from "../../widgets/calendar/types";
import { linkWidgetConfigSchema } from "../../widgets/links/schema";
import type { LinkWidgetConfig } from "../../widgets/links/types";
import { searchWidgetConfigSchema } from "../../widgets/search/schema";
import type { SearchWidgetConfig } from "../../widgets/search/types";
import { timeWidgetConfigSchema } from "../../widgets/time/schema";
import type { TimeWidgetConfig } from "../../widgets/time/types";

export type WidgetConfig = {
  id: string;
  type: WidgetType;
  data:
    | LinkWidgetConfig
    | SearchWidgetConfig
    | CalendarWidgetConfig
    | TimeWidgetConfig;
};

export const WidgetConfigHelper = {
  getSchema() {
    const widgetConfigSchema = z.object({
      id: z.string(),
      type: WidgetTypeHelper.getSchema(),
      data: linkWidgetConfigSchema
        .or(searchWidgetConfigSchema)
        .or(timeWidgetConfigSchema)
        .or(calendarWidgetConfigSchema),
    });

    return widgetConfigSchema;
  },
  /**
   * Checks whether data is of type WidgetConfig[]
   * @param {unknown} data Unkown type to be checked
   * @returns {boolean} Whether data is of type WidgetConfig[]
   */
  isWidgetConfigArray(data: unknown): data is WidgetConfig[] {
    if (!Array.isArray(data)) {
      return false;
    }
    if (!data.every((r) => this.validate(r))) {
      return false;
    }
    return true;
  },
  validate(input: unknown): input is WidgetConfig {
    if (!isObject(input)) {
      return false;
    }
    if (!isString(input.id)) {
      return false;
    }
    if (!WidgetTypeHelper.validate(input.type)) {
      return false;
    }
    if (!this.isFittingDataPaylod(input.data, input.type)) {
      return false;
    }

    return true;
  },
  /**
   * Checks whether data is of type  @type {WidgetConfig["data"]}
   * @param {unknown} data Unkown type to be checked
   * @param {WidgetType} type Unkown type to be checked
   * @returns {boolean} Whether data is of type @type {WidgetConfig["data"]}
   */
  isFittingDataPaylod(
    data: unknown,
    type: WidgetType,
  ): data is WidgetConfig["data"] {
    switch (type) {
      case "calendar":
        return isCalendarWidgetConfig(data);
      case "search":
        return isSearchWidgetConfig(data);
      case "links":
        return isLinkWidgetConfig(data);
      case "time":
        return isTimeWidgetConfig(data);
      default:
        return false;
    }
  },
};
