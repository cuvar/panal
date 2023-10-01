import { MIN_WIDGET_HEIGHT, MIN_WIDGET_WIDTH } from "~/utils/const";
import type { WidgetType } from "~/utils/types/widget";

// todo: write tests
export function getMinWidthForWidget(widgetType: WidgetType): number {
  return MIN_WIDGET_WIDTH[widgetType] ?? MIN_WIDGET_WIDTH.default;
}

export function getMinHeightForWidget(widgetType: WidgetType): number {
  return MIN_WIDGET_HEIGHT[widgetType] ?? MIN_WIDGET_HEIGHT.default;
}
