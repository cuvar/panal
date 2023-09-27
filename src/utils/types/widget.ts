import type {
  CalendarWidgetConfig,
  CalendarWidgetData,
} from "~/server/widgets/calendar/types";
import type {
  LinkWidgetConfig,
  LinkWidgetData,
} from "~/server/widgets/links/types";
import type {
  SearchWidgetConfig,
  SearchWidgetData,
} from "~/server/widgets/search/types";
import type {
  TimeWidgetConfig,
  TimeWidgetData,
} from "~/server/widgets/time/types";

// general
export type WidgetType = "calendar" | "search" | "links" | "time";

export type Positioning = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Layout = Positioning | Record<ScreenSize, Positioning>;

export type WidgetConfig = {
  type: WidgetType;
  layout: Layout;
  data:
    | LinkWidgetConfig
    | SearchWidgetConfig
    | CalendarWidgetConfig
    | TimeWidgetConfig;
};

export type WidgetData = {
  type: WidgetType;
  layout: Layout;
  data: LinkWidgetData | SearchWidgetData | CalendarWidgetData | TimeWidgetData;
};
