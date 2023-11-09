import { z } from "zod";
import { type LinkWidgetConfig, type LinkWidgetData } from "./types";

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
