import { isObject } from "~/utils/guards/base";
import type { TimeWidgetConfig, TimeWidgetData } from "./types";

/**
 * Checks whether data is of type TimeWidgetConfig
 * @param {unknown} data Unkown type to be checked
 * @returns {boolean} Whether data is of type TimeWidgetConfig
 */
export function isTimeWidgetConfig(data: unknown): data is TimeWidgetConfig {
  if (!isObject(data)) {
    return false;
  }
  return true;
}

/**
 * Checks whether data is of type TimeWidgetData
 * @param {unknown} data Unkown type to be checked
 * @returns {boolean} Whether data is of type TimeWidgetData
 */
export function isTimeWidgetData(data: unknown): data is TimeWidgetData {
  if (!isObject(data)) {
    return false;
  }
  return true;
}
