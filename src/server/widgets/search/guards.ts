import { isObject, isString } from "~/utils/guards/base";
import type {
  SearchEngine,
  SearchWidgetConfig,
  SearchWidgetData,
} from "./types";

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

export function isSearchWidgetConfig(
  data: unknown,
): data is SearchWidgetConfig {
  return (
    Array.isArray(data) &&
    data.every((searchEngine) => isSearchEngine(searchEngine))
  );
}
