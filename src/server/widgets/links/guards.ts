import { isObject, isString } from "~/utils/guards/base";
import type { LinkWidgetConfig, LinkWidgetData, LinkWidgetLink } from "./types";

/**
 * Checks whether data is of type LinkWidgetLink
 * @param {unknown} data Unkown type to be checked
 * @returns {boolean} Whether data is of type LinkWidgetLink
 */
export function isLinkWidgetLink(data: unknown): data is LinkWidgetLink {
  if (!isObject(data)) {
    return false;
  }
  if (!("text" in data) || !isString(data.text)) {
    return false;
  }
  if (!("href" in data) || !isString(data.href)) {
    return false;
  }
  if (!("tab" in data) || (data.tab !== "new" && data.tab !== "same")) {
    return false;
  }
  return true;
}

/**
 * Checks whether data is of type LinkWidgetData
 * @param {unknown} data Unkown type to be checked
 * @returns {boolean} Whether data is of type LinkWidgetData
 */
export function isLinkWidgetData(data: unknown): data is LinkWidgetData {
  return (
    Array.isArray(data) &&
    data.every((linkWidgetLink) => isLinkWidgetLink(linkWidgetLink))
  );
}

/**
 * Checks whether data is of type LinkWidgetConfig
 * @param {unknown} data Unkown type to be checked
 * @returns {boolean} Whether data is of type LinkWidgetConfig
 */
export function isLinkWidgetConfig(data: unknown): data is LinkWidgetConfig {
  return (
    Array.isArray(data) &&
    data.every((linkWidgetLink) => isLinkWidgetLink(linkWidgetLink))
  );
}
