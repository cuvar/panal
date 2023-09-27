import { isDate, isNumber, isObject, isString } from "~/utils/guards/base";
import type {
  CalendarEntry,
  CalendarWidgetData,
  CalendarWidgetConfig,
} from "./types";

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
