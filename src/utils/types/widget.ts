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
import type { ScreenSize } from "./types";

// general
export type WidgetType = "calendar" | "search" | "links" | "time";

export type Positioning = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type ScreenSizePositioning = {
  xl: Positioning;
  lg: Positioning;
  md: Positioning;
  sm: Positioning;
  xs: Positioning;
  xss: Positioning;
};

export type PartialScreenSizePositioning = { [K in ScreenSize]?: Positioning };
export type Layout = Positioning | PartialScreenSizePositioning;

export type WidgetConfig = {
  type: WidgetType;
  layout: Layout;
  data:
    | LinkWidgetConfig
    | SearchWidgetConfig
    | CalendarWidgetConfig
    | TimeWidgetConfig;
};

export type AdjustedWidgetConfig = Omit<WidgetConfig, "layout"> & {
  layout: ScreenSizePositioning;
};

export type WidgetData = {
  id: string;
  type: WidgetType;
  layout: ScreenSizePositioning;
  data: LinkWidgetData | SearchWidgetData | CalendarWidgetData | TimeWidgetData;
};
