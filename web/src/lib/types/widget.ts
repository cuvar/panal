import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
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

export type PartialScreenSizePositioning = {
  [K in ScreenSize]?: Positioning;
};
export type Layout = Positioning | PartialScreenSizePositioning;

export type WidgetProps = {
  widget: AdjustedWidgetLayout;
};

export type RGLayout = ReactGridLayout.Layouts;

export type DisplayedWidgets = {
  rgLayout: RGLayout;
  awLayout: AdjustedWidgetLayout[];
};

export type LayoutType = {
  id: string;
  type: WidgetType;
};
