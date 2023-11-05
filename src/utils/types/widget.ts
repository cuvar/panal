import { type AdjustedWidgetLayout } from "~/server/entities/adjustedWidgetLayout";
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

export type WidgetProps = {
  widget: AdjustedWidgetLayout;
};
