import type { SearchWidgetConfig, SearchWidgetData } from "./types";

/**
 * Compute data for link widget
 * @param {SearchWidgetConfig} config config for link widget
 * @returns {SearchWidgetData} data for link widget
 */
export default function computeSearchWidgetData(
  config: SearchWidgetConfig,
): SearchWidgetData {
  return {
    searchEngines: config,
  };
}
