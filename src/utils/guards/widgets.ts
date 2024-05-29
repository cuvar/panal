import { type WidgetConfig } from "~/server/domain/config/widgetConfig";
import { isCalendarWidgetConfig } from "~/server/widgets/calendar/guards";
import { isLinkWidgetConfig } from "~/server/widgets/links/guards";
import { isSearchWidgetConfig } from "~/server/widgets/search/guards";
import { isTimeWidgetConfig } from "~/server/widgets/time/guards";
import { BREAKPOINTS_ORDER } from "../../lib/basic/const";
import type {
  HidingInfo,
  Layout,
  PartialScreenSizePositioning,
  Positioning,
  ScreenSizePositioning,
  WidgetType,
} from "../types/widget";
import { isNumber, isObject } from "./base";
import { isScreenSize } from "./other";

/**
 * Checks whether data is of type  @type {WidgetConfig["data"]}
 * @param {unknown} data Unkown type to be checked
 * @param {WidgetType} type Unkown type to be checked
 * @returns {boolean} Whether data is of type @type {WidgetConfig["data"]}
 */
export function isFittingDataPaylod(
  data: unknown,
  type: WidgetType,
): data is WidgetConfig["data"] {
  switch (type) {
    case "calendar":
      return isCalendarWidgetConfig(data);
    case "search":
      return isSearchWidgetConfig(data);
    case "links":
      return isLinkWidgetConfig(data);
    case "time":
      return isTimeWidgetConfig(data);
    default:
      return false;
  }
}

/**
 * Checks whether data is of type WidgetType
 * @param {unknown} type Unkown type to be checked
 * @returns {boolean} Whether data is of type WidgetType
 */
export function isWidgetType(type: unknown): type is WidgetType {
  return (
    type === "calendar" ||
    type === "search" ||
    type === "links" ||
    type === "time"
  );
}

/**
 * Checks whether data is of type Layout
 * @param {unknown} layout Unkown type to be checked
 * @returns {boolean} Whether data is of type Layout
 */
export function isLayout(layout: unknown): layout is Layout {
  if (!isObject(layout)) {
    return false;
  }

  if (isPositioning(layout)) {
    return true;
  }

  let foundIssue = false;
  Object.entries(layout).forEach(([key, value]) => {
    if (!isScreenSize(key)) {
      foundIssue = true;
    }
    if (!isPositioning(value) && !isHidingInfo(value)) {
      foundIssue = true;
    }
  });
  if (foundIssue) return false;
  return true;
}

/**
 * Checks whether data is of type Positioning
 * @param {unknown} positioning Unkown type to be checked
 * @returns {boolean} Whether data is of type Positioning
 */
export function isPositioning(
  positioning: unknown,
): positioning is Positioning {
  if (!isObject(positioning)) {
    return false;
  }
  if (!isNumber(positioning.x)) {
    return false;
  }
  if (!isNumber(positioning.y)) {
    return false;
  }
  if (!isNumber(positioning.w)) {
    return false;
  }
  if (!isNumber(positioning.h)) {
    return false;
  }
  return true;
}

/**
 * Checks whether data is of type PartialScreenSizePositioning
 * @param {unknown} data Unkown type to be checked
 * @returns {boolean} Whether data is of type PartialScreenSizePositioning
 */
export function isPartialScreenSizePositioning(
  data: unknown,
): data is PartialScreenSizePositioning {
  if (!isObject(data)) {
    return false;
  }

  let foundIssue = false;
  Object.entries(data).forEach(([key, value]) => {
    if (!isScreenSize(key)) {
      foundIssue = true;
    }
    if (!isPositioning(value) && !isHidingInfo(value) && !foundIssue) {
      foundIssue = false;
    }
  });
  if (foundIssue) return false;
  return true;
}

/**
 * Checks whether data is of type ScreenSizePositioning
 * @param {unknown} data Unkown type to be checked
 * @returns {boolean} Whether data is of type ScreenSizePositioning
 */
export function isScreenSizePositioning(
  data: unknown,
): data is ScreenSizePositioning {
  if (!isObject(data)) {
    return false;
  }
  if (Object.entries(data).length !== BREAKPOINTS_ORDER.length) {
    // not all screen sizes are present
    return false;
  }

  let foundIssue = false;
  Object.entries(data).forEach(([key, value]) => {
    if (!isScreenSize(key)) {
      foundIssue = true;
    }
    if (!isPositioning(value)) {
      foundIssue = true;
    }
  });
  if (foundIssue) return false;

  return true;
}

/**
 * Checks whether data is of type HidingInfo
 * @param {unknown} data Unkown type to be checked
 * @returns {boolean} Whether data is of type HidingInfo
 */
export function isHidingInfo(data: unknown): data is HidingInfo {
  if (!isObject(data)) {
    return false;
  }
  if (Object.entries(data).length !== 1) {
    return false;
  }
  if (data.hiding === undefined) {
    return false;
  }
  if (typeof data.hiding !== "boolean") {
    return false;
  }
  return true;
}
