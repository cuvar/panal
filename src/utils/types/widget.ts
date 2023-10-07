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

export type ScreenSizePositioning = Record<ScreenSize, Positioning>;

export type HidingInfo = { hiding: boolean };
export type PartialScreenSizePositioning = {
  [K in ScreenSize]?: Positioning | HidingInfo;
};
export type Layout = Positioning | PartialScreenSizePositioning;

export type UserWidgetConfig = {
  type: WidgetType;
  layout: Layout;
  data:
    | LinkWidgetConfig
    | SearchWidgetConfig
    | CalendarWidgetConfig
    | TimeWidgetConfig;
};

export type AdjustedWidgetConfig = Omit<UserWidgetConfig, "layout"> & {
  id: string;
  layout: ScreenSizePositioning;
};

export type WidgetData = {
  id: string;
  type: WidgetType;
  layout: ScreenSizePositioning;
  data: LinkWidgetData | SearchWidgetData | CalendarWidgetData | TimeWidgetData;
};
