import { z } from "zod";
import {
  WidgetTypeHelper,
  type WidgetType,
} from "~/server/domain/config/widgetType";
import { calendarWidgetDataSchema } from "../../widgets/calendar/schema";
import type { CalendarWidgetData } from "../../widgets/calendar/types";
import { linkWidgetDataSchema } from "../../widgets/links/schema";
import type { LinkWidgetData } from "../../widgets/links/types";
import { searchWidgetDataSchema } from "../../widgets/search/schema";
import type { SearchWidgetData } from "../../widgets/search/types";
import { timeWidgetDataSchema } from "../../widgets/time/schema";
import type { TimeWidgetData } from "../../widgets/time/types";

export type WidgetData = {
  id: string;
  type: WidgetType;
  data: LinkWidgetData | SearchWidgetData | CalendarWidgetData | TimeWidgetData;
};

export const WidgetDataHelper = {
  getSchema() {
    const widgetDataSchema = z.object({
      id: z.string(),
      type: WidgetTypeHelper.getSchema(),
      data: linkWidgetDataSchema
        .or(searchWidgetDataSchema)
        .or(timeWidgetDataSchema)
        .or(calendarWidgetDataSchema),
    });

    return widgetDataSchema;
  },
};
