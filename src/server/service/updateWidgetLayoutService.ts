import type GridLayout from "react-grid-layout";
import { BREAKPOINTS_ORDER } from "~/utils/const";
import AppError from "~/utils/error";
import { isSameSet } from "~/utils/helper";
import Log from "~/utils/log";
import type { ScreenSize } from "~/utils/types/types";
import type { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";

/**
 * Updates the layout values of the given AdjustedWidgetConfig[] with the given GridLayout.Layouts
 * @param {GridLayout.Layouts} newLayouts Layout updates for various ScreenSizes
 * @param {AdjustedWidgetConfig[]} widgetConfig AdjustedWidgetConfig[] to update
 * @returns {AdjustedWidgetConfig[]} Updated AdjustedWidgetConfig[]
 */
export default function updateWidgetLayoutService(
  newLayouts: GridLayout.Layouts,
  widgetConfig: AdjustedWidgetConfig[],
): AdjustedWidgetConfig[] {
  if (!newLayouts) {
    const error = new AppError("`newLayouts` is undefined");
    Log(error, "error");
    return widgetConfig;
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
    updateForScreenSize(newLayouts, widgetConfig, breakpoint);
  });

  return widgetConfig;
}

/**
 * Updates the layout values of the given AdjustedWidgetConfig[] with the given GridLayout.Layouts for the given ScreenSize
 * @param {GridLayout.Layouts} newLayouts new layout values for the given ScreenSize
 * @param {AdjustedWidgetConfig[]} widgetConfig AdjustedWidgetConfig[] to update
 * @param {ScreenSize} breakpoint given ScreenSize
 */
function updateForScreenSize(
  newLayouts: GridLayout.Layouts,
  widgetConfig: AdjustedWidgetConfig[],
  breakpoint: ScreenSize,
) {
  newLayouts[breakpoint]?.forEach((layout) => {
    const widget = widgetConfig.find((widget) => widget.id === layout.i);
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
