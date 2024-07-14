import {
  BREAKPOINT_COLS,
  GRID_MAX_ROW,
  HIDDEN_POSITIONING,
} from "~/lib/basic/const";
import { isScreenSize } from "~/lib/guards/other";
import type { ScreenSize } from "~/lib/types/types";
import type { Positioning, WidgetType } from "~/lib/types/widget";
import { type AdjustedWidgetLayout } from "../adjustedWidgetLayout";
import {
  getMinHeightForWidget,
  getMinWidthForWidget,
} from "./computeSizeForWidgetService";

/**
 * 1. Changes width and height to meet at least the MIN_WIDTH and MIN_HEIGHT.
 * 2. Changes width and height if they exceed the MAX_COLS for a `ScreenSize`
 * 3. Adjusts positioning values to not be negative
 * 4. Adjusts positioning values to not be outside of the bounds of the screen
 * Adjusts the sizing parameters of a widget's layout. Specifically:
 * @param {AdjustedWidgetLayout} widget Widget to adjust layout values for
 * @returns {AdjustedWidgetLayout} widget with adjusted layout values
 */
export default function adjustLayoutValues(
  widget: AdjustedWidgetLayout,
): AdjustedWidgetLayout {
  Object.entries(widget.layout).forEach(([key, value]) => {
    if (isScreenSize(key)) {
      widget.layout[key] = adjustBoundsForMinValues(value, widget.type, key);
    }
  });
  return widget;
}

/**
 * Adjusts the sizing parameters of a widget's layout. Specifically:
 * @param {Positioning} layout Layout to adjust
 * @param {WidgetType} type WidgetType to adjust layout values for
 * @param {ScreenSize} screenSize ScreenSize to adjust layout values for
 * @returns {Positioning} layout with adjusted values
 */
function adjustBoundsForMinValues(
  layout: Positioning,
  type: WidgetType,
  screenSize: ScreenSize,
): Positioning {
  const minWidth = getMinWidthForWidget(type);
  const minHeight = getMinHeightForWidget(type);

  // 1. Changes width and height to meet at least the MIN_WIDTH and MIN_HEIGHT.
  if (layout.w < minWidth && !(layout.w == 0 && layout.h == 0)) {
    layout.w = minWidth;
  }

  if (layout.h < minHeight && !(layout.w == 0 && layout.h == 0)) {
    layout.h = minHeight;
  }

  // 2. Changes width and height if they exceed the MAX_COLS for a `ScreenSize`
  if (layout.w > BREAKPOINT_COLS[screenSize]) {
    layout.w =
      BREAKPOINT_COLS[screenSize] > minWidth
        ? BREAKPOINT_COLS[screenSize]
        : minWidth;
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
    if (layout.x < 0) return HIDDEN_POSITIONING;
  }

  if (layout.y > GRID_MAX_ROW) {
    layout.y = GRID_MAX_ROW - 1;
  }
  return layout;
}
