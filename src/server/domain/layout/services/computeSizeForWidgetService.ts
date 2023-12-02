import { MIN_WIDGET_HEIGHT, MIN_WIDGET_WIDTH } from "~/utils/const";
import type { WidgetType } from "~/utils/types/widget";

/**
 * Gets the minimum width for a widget of the given type
 * @param {WidgetType} widgetType WidgetType to get minimum width for
 * @returns {number} Minimum width for a widget of the given type
 */
export function getMinWidthForWidget(widgetType: WidgetType): number {
  return MIN_WIDGET_WIDTH[widgetType] ?? MIN_WIDGET_WIDTH.default;
}

/**
 * Gets the minimum height for a widget of the given type
 * @param {WidgetType} widgetType WidgetType to get minimum height for
 * @returns {number} Minimum height for a widget of the given type
 */
export function getMinHeightForWidget(widgetType: WidgetType): number {
  return MIN_WIDGET_HEIGHT[widgetType] ?? MIN_WIDGET_HEIGHT.default;
}
