import { z } from "zod";
import {
  calendarWidgetDataSchema,
  linkWidgetDataSchema,
  searchWidgetDataSchema,
  timeWidgetDataSchema,
  widgetTypeSchema,
} from "~/utils/schema";
import type { ScreenSizePositioning, WidgetType } from "~/utils/types/widget";
import type { CalendarWidgetData } from "../widgets/calendar/types";
import type { LinkWidgetData } from "../widgets/links/types";
import type { SearchWidgetData } from "../widgets/search/types";
import type { TimeWidgetData } from "../widgets/time/types";

export class WidgetData {
  id: string;
  type: WidgetType;
  layout: ScreenSizePositioning;
  data: LinkWidgetData | SearchWidgetData | CalendarWidgetData | TimeWidgetData;

  constructor(
    id: string,
    type: WidgetType,
    layout: ScreenSizePositioning,
    data:
      | LinkWidgetData
      | SearchWidgetData
      | CalendarWidgetData
      | TimeWidgetData,
  ) {
    this.id = id;
    this.type = type;
    this.layout = layout;
    this.data = data;
  }

  static getSchema() {
    const widgetDataSchema: z.ZodType<Omit<WidgetData, "layout">> = z.object({
      id: z.string(),
      type: widgetTypeSchema,
      data: linkWidgetDataSchema
        .or(searchWidgetDataSchema)
        .or(timeWidgetDataSchema)
        .or(calendarWidgetDataSchema),
    });

    return widgetDataSchema;
  }
}
