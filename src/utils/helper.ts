import { createId } from "@paralleldrive/cuid2";
import type { Positioning, WidgetType } from "./types/widget";

/**
 * Checks whether input is of type empty Positioning
 * @returns {string} Whether data is of type Layout
 */
export function generateUniqueID(): string {
  return createId();
}

/**
 * Checks whether two arrays contain the same elements
 * @param {unknown[]} arr1 First array
 * @param {unknown[]} arr2 Second array
 * @returns {boolean} Whether both arrays contain the same elements
 */
export function isSameSet(arr1: readonly unknown[], arr2: readonly unknown[]) {
  return arr1.every((item) => arr2.includes(item));
}

/**
 * Checks whether input is of type empty Positioning
 * @param {Positioning} positioning Unkown type to be checked
 * @returns {boolean} Whether data is of type Layout
 */
export function isEmptyPositioning(positioning: Positioning): boolean {
  return (
    positioning.h === 0 &&
    positioning.w === 0 &&
    positioning.x === 0 &&
    positioning.y === 0
  );
}

/**
 * Turns a given WidgetType into an appropriate display name.
 * @param {WidgetType} type WidgetType for which the display name is required
 * @returns {string} Display name for WidgetType
 */
export function getNameForWidgetType(type: WidgetType): string {
  if (type === "time") return "Time";
  if (type === "calendar") return "Calendar";
  if (type === "links") return "Link Collection";
  if (type === "search") return "Search";
  return "unknown";
}

/**
 * Properly formats a JSON object to a string with right spacing and newlines
 * @param {object} json JSON Object to format
 * @returns {string} Proper formatted JSON string
 */
export function toProperJsonStringFormat(json: object): string {
  return JSON.stringify(json, null, 2);
}
