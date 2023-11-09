import { z } from "zod";
import {
  type CalendarEntry,
  type CalendarWidgetConfig,
  type CalendarWidgetData,
} from "./types";

export const calendarEntrySchema: z.ZodType<CalendarEntry> = z.object({
  title: z.string(),
  start: z.date(),
  end: z.date(),
  duration: z.number(),
  color: z.string().length(7),
});

export const calendarWidgetDataSchema: z.ZodType<CalendarWidgetData> = z.object(
  {
    entries: z.array(z.array(calendarEntrySchema)),
  },
);

export const calendarWidgetConfigSchema: z.ZodType<CalendarWidgetConfig> =
  z.array(
    z.object({
      url: z.string(),
      daysInAdvance: z.number(),
      color: z.string().length(7).optional(),
    }),
  );
