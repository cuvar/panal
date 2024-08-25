import { z } from "zod";
import {
  type LinkWidgetConfig,
  type LinkWidgetData,
  type LinkWidgetLink,
} from "./types";

export const linkWidgetLinkSchema: z.ZodType<LinkWidgetLink> = z.object({
  text: z.string(),
  href: z.string(),
  tab: z.enum(["new", "same"]),
});

export const linkWidgetDataSchema: z.ZodType<LinkWidgetData> = z.object({
  title: z.string().optional(),
  links: z.array(linkWidgetLinkSchema),
});

export const linkWidgetConfigSchema: z.ZodType<LinkWidgetConfig> = z.object({
  title: z.string().optional(),
  links: z.array(linkWidgetLinkSchema),
});
