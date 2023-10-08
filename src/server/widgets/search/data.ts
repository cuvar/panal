import type { SearchWidgetConfig, SearchWidgetData } from "./types";

export default function computeSearchWidgetData(
  config: SearchWidgetConfig,
): SearchWidgetData {
  return {
    searchEngines: config,
  };
}
