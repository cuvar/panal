import { isDate, isNumber, isObject, isString } from "~/utils/guards/base";
import type {
  CalendarEntry,
  CalendarWidgetConfig,
  CalendarWidgetData,
} from "./types";

/**
 * Checks whether data is of type CalendarWidgetConfig
 * @param {unknown} data Unkown type to be checked
 * @returns {boolean} Whether data is of type CalendarWidgetConfig
 */
export function isCalendarWidgetConfig(
  data: unknown,
): data is CalendarWidgetConfig {
  if (!isObject(data)) {
    return false;
  }
  if (!("url" in data) || !isString(data.url)) {
    return false;
  }
  if (!("daysInAdvance" in data) || !isNumber(data.daysInAdvance)) {
    return false;
  }
  return true;
}

/**
 * Checks whether data is of type CalendarWidgetData
 * @param {unknown} data Unkown type to be checked
 * @returns {boolean} Whether data is of type CalendarWidgetData
 */
export function isCalendarWidgetData(
  data: unknown,
): data is CalendarWidgetData {
  if (!isObject(data)) {
    return false;
  }
  if (!("entries" in data) || !Array.isArray(data.entries)) {
    return false;
  }
  if (
    !data.entries.every(
      (entry) =>
        Array.isArray(entry) && entry.every((entry) => isCalendarEntry(entry)),
    )
  ) {
    return false;
  }

  return true;
}

/**
 * Checks whether data is of type CalendarEntry
 * @param {unknown} data Unkown type to be checked
 * @returns {boolean} Whether data is of type CalendarEntry
 */
export function isCalendarEntry(data: unknown): data is CalendarEntry {
  if (!isObject(data)) {
    return false;
  }
  if (!("title" in data) || isString(data.tile)) {
    return false;
  }
  if (!("start" in data) || !isDate(data.start)) {
    return false;
  }
  if (!("end" in data) || !isDate(data.end)) {
    return false;
  }
  if (!("duration" in data) || !isNumber(data.duration)) {
    return false;
  }
  return true;
}
