import type GridLayout from "react-grid-layout";
import { BREAKPOINTS_ORDER } from "~/utils/const";
import AppError from "~/utils/error";
import { isSameSet } from "~/utils/helper";
import Log from "~/utils/log";
import type { ScreenSize } from "~/utils/types/types";
import type { AdjustedWidgetLayout } from "../adjustedWidgetLayout";

/**
 * Updates the layout values of the given AdjustedWidgetLayout[] with the given GridLayout.Layouts
 * @param {GridLayout.Layouts} newLayouts Layout updates for various ScreenSizes
 * @param {AdjustedWidgetLayout[]} widgetLayout AdjustedWidgetLayout[] to update
 * @returns {AdjustedWidgetLayout[]} Updated AdjustedWidgetLayout[]
 */
export default function updateWidgetLayoutService(
  newLayouts: GridLayout.Layouts,
  widgetLayout: AdjustedWidgetLayout[],
): AdjustedWidgetLayout[] {
  if (!newLayouts) {
    const error = new AppError("`newLayouts` is undefined");
    Log(error, "error");
    return widgetLayout;
  }

  if (!isSameSet(BREAKPOINTS_ORDER, Object.keys(newLayouts))) {
    Log(
      new AppError("newLayouts is invalid because of missing screen sizes"),
      "error",
    );
  }
  BREAKPOINTS_ORDER.forEach((breakpoint) => {
    if (!newLayouts[breakpoint]) {
      Log(
        new AppError(breakpoint + " does not exist in `newLayouts`"),
        "error",
      );
      return;
    }
    updateForScreenSize(newLayouts, widgetLayout, breakpoint);
  });

  return widgetLayout;
}

/**
 * Updates the layout values of the given AdjustedWidgetLayout[] with the given GridLayout.Layouts for the given ScreenSize
 * @param {GridLayout.Layouts} newLayouts new layout values for the given ScreenSize
 * @param {AdjustedWidgetLayout[]} widgetLayout AdjustedWidgetLayout[] to update
 * @param {ScreenSize} breakpoint given ScreenSize
 */
function updateForScreenSize(
  newLayouts: GridLayout.Layouts,
  widgetLayout: AdjustedWidgetLayout[],
  breakpoint: ScreenSize,
) {
  newLayouts[breakpoint]?.forEach((layout) => {
    const widget = widgetLayout.find((widget) => widget.id === layout.i);
    if (!widget) {
      const error = new AppError("Widget could not be found");
      Log(error, "error");
      return;
    }
    widget.setLayout(breakpoint, {
      x: layout.x,
      y: layout.y,
      w: layout.w,
      h: layout.h,
    });
  });
}
