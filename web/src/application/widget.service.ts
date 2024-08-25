import { createId } from "@paralleldrive/cuid2";
import { type WidgetType } from "~/server/domain/config/widgetType";

/**
 * Checks whether input is of type empty Positioning
 * @returns {string} Whether data is of type Layout
 */
export function generateUniqueID(): string {
  return createId();
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
