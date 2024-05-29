import type GridLayout from "react-grid-layout";
import { z } from "zod";
import type {
  Positioning,
  ScreenSizePositioning,
  WidgetType,
} from "~/lib/types/widget";
import { type ScreenSize } from "./types";

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

export const screenSizeSchema: z.ZodType<ScreenSize> = z.enum([
  "xl",
  "lg",
  "md",
  "sm",
  "xs",
  "xss",
]);
