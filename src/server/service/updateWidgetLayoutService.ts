import type GridLayout from "react-grid-layout";
import { BREAKPOINTS_ORDER } from "~/utils/const";
import { isSameSet } from "~/utils/helper";
import type { ScreenSize } from "~/utils/types/types";
import type { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";

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
    }
  });

  return widgetConfig;
}

function updateForScreenSize(
  newLayouts: GridLayout.Layouts,
  widgetConfig: AdjustedWidgetConfig[],
  breakpoint: ScreenSize,
) {
  newLayouts[breakpoint]?.forEach((layout) => {
    const widget = widgetConfig.find((widget) => widget.id === layout.i);
    if (!widget) throw new Error("widget not found");
    widget.setLayout(breakpoint, layout);
  });
}
