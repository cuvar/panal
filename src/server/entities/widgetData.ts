import { z } from "zod";
import { widgetTypeSchema } from "~/utils/schema";
import type { WidgetType } from "~/utils/types/widget";
import { calendarWidgetDataSchema } from "../widgets/calendar/schema";
import type { CalendarWidgetData } from "../widgets/calendar/types";
import { linkWidgetDataSchema } from "../widgets/links/schema";
import type { LinkWidgetData } from "../widgets/links/types";
import { searchWidgetDataSchema } from "../widgets/search/schema";
import type { SearchWidgetData } from "../widgets/search/types";
import { timeWidgetDataSchema } from "../widgets/time/schema";
import type { TimeWidgetData } from "../widgets/time/types";

export class WidgetData {
  id: string;
  type: WidgetType;
  data: LinkWidgetData | SearchWidgetData | CalendarWidgetData | TimeWidgetData;
  constructor(
    id: string,
    type: WidgetType,
    data:
      | LinkWidgetData
      | SearchWidgetData
      | CalendarWidgetData
      | TimeWidgetData,
  ) {
    this.id = id;
    this.type = type;
    this.data = data;
  }

  static getSchema() {
    const widgetConfigSchema = z.object({
      id: z.string(),
      type: widgetTypeSchema,
      data: linkWidgetDataSchema
        .or(searchWidgetDataSchema)
        .or(timeWidgetDataSchema)
        .or(calendarWidgetDataSchema),
    });

    return widgetConfigSchema;
  }
}
