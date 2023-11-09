import { z } from "zod";
import {
  type SearchEngine,
  type SearchWidgetConfig,
  type SearchWidgetData,
} from "./types";

export const searchEngineSchema: z.ZodType<SearchEngine> = z.object({
  key: z.enum(["google", "duckduckgo", "ecosia", "gdrive"]),
  displayName: z.string(),
  url: z.string(),
});

export const searchWidgetDataSchema: z.ZodType<SearchWidgetData> = z.object({
  searchEngines: z.array(searchEngineSchema),
});

export const searchWidgetConfigSchema: z.ZodType<SearchWidgetConfig> =
  z.array(searchEngineSchema);
