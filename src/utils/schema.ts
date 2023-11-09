import type GridLayout from "react-grid-layout";
import { z } from "zod";
import type {
  CalendarEntry,
  CalendarWidgetConfig,
  CalendarWidgetData,
} from "~/server/widgets/calendar/types";
import type {
  LinkWidgetConfig,
  LinkWidgetData,
} from "~/server/widgets/links/types";
import type {
  SearchEngine,
  SearchWidgetConfig,
  SearchWidgetData,
} from "~/server/widgets/search/types";
import type {
  TimeWidgetConfig,
  TimeWidgetData,
} from "~/server/widgets/time/types";
import type {
  Positioning,
  ScreenSizePositioning,
  WidgetType,
} from "~/utils/types/widget";

export const positioningSchema: z.ZodType<Positioning> = z.object({
  x: z.number(),
  y: z.number(),
  w: z.number(),
  h: z.number(),
});

export const gridPositioningSchema: z.ZodType<Positioning & { i: string }> =
  z.object({
    h: z.number(),
    i: z.string(),
    minH: z.number(),
    minW: z.number(),
    static: z.boolean(),
    w: z.number(),
    x: z.number(),
    y: z.number(),
  });

export const widgetLayoutSchema: z.ZodType<GridLayout.Layouts> = z.object({
  xl: z.array(gridPositioningSchema),
  lg: z.array(gridPositioningSchema),
  md: z.array(gridPositioningSchema),
  sm: z.array(gridPositioningSchema),
  xs: z.array(gridPositioningSchema),
  xss: z.array(gridPositioningSchema),
});

export const screenSizePositioningSchema: z.ZodType<ScreenSizePositioning> =
  z.object({
    xl: positioningSchema,
    lg: positioningSchema,
    md: positioningSchema,
    sm: positioningSchema,
    xs: positioningSchema,
    xss: positioningSchema,
  });

export const widgetTypeSchema: z.ZodType<WidgetType> = z.enum([
  "calendar",
  "search",
  "links",
  "time",
]);

export const linkWidgetDataSchema: z.ZodType<LinkWidgetConfig> = z.array(
  z.object({
    text: z.string(),
    href: z.string(),
    tab: z.enum(["new", "same"]),
  }),
);

export const linkWidgetConfigSchema: z.ZodType<LinkWidgetData> = z.array(
  z.object({
    text: z.string(),
    href: z.string(),
    tab: z.enum(["new", "same"]),
  }),
);

export const searchEngineSchema: z.ZodType<SearchEngine> = z.object({
  key: z.enum(["google", "duckduckgo", "ecosia", "gdrive"]),
  displayName: z.string(),
  url: z.string(),
});

export const searchWidgetDataSchema: z.ZodType<SearchWidgetData> = z.object({
  searchEngines: z.array(searchEngineSchema),
});

export const searchWidgetConfigSchema: z.ZodType<SearchWidgetConfig> =
  z.array(searchEngineSchema);

export const timeWidgetDataSchema: z.ZodType<TimeWidgetData> = z.object({});
export const timeWidgetConfigSchema: z.ZodType<TimeWidgetConfig> = z.object({});

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
      color: z.string(),
    }),
  );
