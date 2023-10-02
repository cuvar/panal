import { BREAKPOINT_COLS } from "~/utils/const";
import { isScreenSize } from "~/utils/guards/other";
import { ScreenSize } from "~/utils/types/types";
import type { Positioning, WidgetData, WidgetType } from "~/utils/types/widget";
import {
  getMinHeightForWidget,
  getMinWidthForWidget,
} from "./computeSizeForWidgetService";

/**
 * Adjusts the sizing parameters of a widget's layout. Specifically:
 * 1. Changes width and height to meet at least the MIN_WIDTH and MIN_HEIGHT.
 * 2. Changes width and height if they exceed the MAX_COLS for a `ScreenSize`
 * 3. Adjusts positioning values to not be negative
 * 4. Adjusts positioning values to not be outside of the bounds of the screen
 * @param widgets widgetConfig or widgetData
 * @returns adjusted widgetConfig or widgetData
 */
export default function adjustLayoutValues<
  T extends Pick<WidgetData, "layout" | "type">,
>(widget: T): T {
  Object.entries(widget.layout).forEach(([key, value]) => {
    if (isScreenSize(key)) {
      widget.layout[key] = adjustBoundsForMinValues(value, widget.type, key);
    }
  });
  return widget as T;
}

function adjustBoundsForMinValues(
  layout: Positioning,
  type: WidgetType,
  screenSize: ScreenSize,
): Positioning {
  const minWidth = getMinWidthForWidget(type);
  const minHeight = getMinHeightForWidget(type);
  // 1. Changes width and height to meet at least the MIN_WIDTH and MIN_HEIGHT.
  if (layout.w < minWidth) {
    layout.w = minWidth;
  }

  if (layout.h < minHeight) {
    layout.h = minHeight;
  }

  // 2. Changes width and height if they exceed the MAX_COLS for a `ScreenSize`
  if (layout.w > BREAKPOINT_COLS[screenSize]) {
    layout.w = BREAKPOINT_COLS[screenSize];
  }

  // 3. Adjusts positioning values to not be negative
  if (layout.x < 0) {
    layout.x = 0;
  }

  if (layout.y < 0) {
    layout.y = 0;
  }

  // 4. Adjusts positioning values to not be outside of the bounds of the screen
  if (layout.x + layout.w > BREAKPOINT_COLS[screenSize]) {
    layout.x = BREAKPOINT_COLS[screenSize] - layout.w;
  }
  return layout;
}
