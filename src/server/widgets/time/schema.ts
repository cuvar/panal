import { z } from "zod";
import { type TimeWidgetConfig, type TimeWidgetData } from "./types";

export const timeWidgetDataSchema: z.ZodType<TimeWidgetData> = z.object({});
export const timeWidgetConfigSchema: z.ZodType<TimeWidgetConfig> = z.object({});
