import { isObject, isString } from "~/lib/guards/base";
import type {
  SearchEngine,
  SearchWidgetConfig,
  SearchWidgetData,
} from "./types";

/**
 * Checks whether data is of type SearchEngine
 * @param {unknown} data Unkown type to be checked
 * @returns {boolean} Whether data is of type SearchEngine
 */
export function isSearchEngine(data: unknown): data is SearchEngine {
  if (!isObject(data)) {
    return false;
  }

  if (
    !("key" in data) ||
    !["google", "duckduckgo", "ecosia", "gdrive"].includes(data.key)
  ) {
    return false;
  }
  if (!("displayName" in data) || !isString(data.displayName)) {
    return false;
  }
  if (!("url" in data) || !isString(data.url)) {
    return false;
  }
  return true;
}

/**
 * Checks whether data is of type SearchWidgetData
 * @param {unknown} data Unkown type to be checked
 * @returns {boolean} Whether data is of type SearchWidgetData
 */
export function isSearchWidgetData(data: unknown): data is SearchWidgetData {
  if (!isObject(data)) {
    return false;
  }

  if (!("searchEngines" in data) || !isObject(data.searchEngines)) {
    return false;
  }

  if (!Array.isArray(data.searchEngines)) {
    return false;
  }

  return data.searchEngines.every((searchEngine) =>
    isSearchEngine(searchEngine),
  );
}

/**
 * Checks whether data is of type SearchWidgetConfig
 * @param {unknown} data Unkown type to be checked
 * @returns {boolean} Whether data is of type SearchWidgetConfig
 */
export function isSearchWidgetConfig(
  data: unknown,
): data is SearchWidgetConfig {
  return (
    Array.isArray(data) &&
    data.every((searchEngine) => isSearchEngine(searchEngine))
  );
}
