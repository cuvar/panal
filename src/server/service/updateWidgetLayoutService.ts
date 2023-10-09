import type GridLayout from "react-grid-layout";
import { BREAKPOINTS_ORDER } from "~/utils/const";
import { isSameSet } from "~/utils/helper";
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
  if (!newLayouts) throw new Error("newLayouts is undefined");
  if (!isSameSet(BREAKPOINTS_ORDER, Object.keys(newLayouts))) {
    throw new Error("newLayouts is not valid");
  }
  BREAKPOINTS_ORDER.forEach((breakpoint) => {
    if (!newLayouts[breakpoint]) throw new Error("newLayouts is not valid");
    try {
      updateForScreenSize(newLayouts, widgetConfig, breakpoint);
    } catch (error) {
      if (typeof error === "string") {
        throw new Error(error);
      }
      throw error;
    }
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
    if (!widget) throw new Error("widget not found");
    widget.setLayout(breakpoint, {
      x: layout.x,
      y: layout.y,
      w: layout.w,
      h: layout.h,
    });
  });
}
