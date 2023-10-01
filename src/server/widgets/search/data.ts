import type { SearchWidgetData, SearchWidgetConfig } from "./types";

export default function computeSearchWidgetData(
  config: SearchWidgetConfig,
): SearchWidgetData {
  return {
    searchEngines: config,
  };
}
