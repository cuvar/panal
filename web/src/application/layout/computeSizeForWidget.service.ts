import { MIN_WIDGET_HEIGHT, MIN_WIDGET_WIDTH } from "~/lib/basic/const";
import { type WidgetType } from "~/server/domain/config/widgetType";
import { type ScreenSize } from "~/server/domain/other/screenSize";

/**
 * Gets the minimum width for a widget of the given type
 * @param {WidgetType} widgetType WidgetType to get minimum width for
 * @param screenSize
 * @returns {number} Minimum width for a widget of the given type
 */
export function getMinWidthForWidget(
  widgetType: WidgetType,
  screenSize: ScreenSize,
): number {
  return (
    MIN_WIDGET_WIDTH[widgetType][screenSize] ??
    MIN_WIDGET_WIDTH.default[screenSize]
  );
}

/**
 * Gets the minimum height for a widget of the given type
 * @param {WidgetType} widgetType WidgetType to get minimum height for
 * @param screenSize
 * @returns {number} Minimum height for a widget of the given type
 */
export function getMinHeightForWidget(
  widgetType: WidgetType,
  screenSize: ScreenSize,
): number {
  return (
    MIN_WIDGET_HEIGHT[widgetType][screenSize] ??
    MIN_WIDGET_HEIGHT.default[screenSize]
  );
}
