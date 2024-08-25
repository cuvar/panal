import { z } from "zod";
import { type RGLayout } from "./layout";
import { type Positioning } from "./positioning";

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

export const widgetLayoutSchema: z.ZodType<RGLayout> = z.object({
  xl: z.array(gridPositioningSchema),
  lg: z.array(gridPositioningSchema),
  md: z.array(gridPositioningSchema),
  sm: z.array(gridPositioningSchema),
  xs: z.array(gridPositioningSchema),
  xss: z.array(gridPositioningSchema),
});
