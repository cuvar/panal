import { BREAKPOINTS_ORDER } from "~/lib/basic/const";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import Log from "~/lib/log/log";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { type RGLayout } from "~/server/domain/layout/layout";
import { type ScreenSize } from "~/server/domain/other/screenSize";

/**
 * Updates the layout values of the given AdjustedWidgetLayout[] with the given RGLayout
 * @param {RGLayout} newLayouts Layout updates for various ScreenSizes
 * @param {AdjustedWidgetLayout[]} widgetLayout AdjustedWidgetLayout[] to update
 * @returns {AdjustedWidgetLayout[]} Updated AdjustedWidgetLayout[]
 */
export default function updateWidgetLayoutService(
  newLayouts: RGLayout,
  widgetLayout: AdjustedWidgetLayout[],
): AdjustedWidgetLayout[] {
  if (!newLayouts) {
    const error = new AppError(codes.SERVICE_UPDATE_LAYOUT_MISSING_LAYOUTS);
    Log(error, "error");
    return widgetLayout;
  }
  const isSameSet = BREAKPOINTS_ORDER.every((item) =>
    Object.keys(newLayouts).includes(item),
  );
  if (!isSameSet) {
    Log(new AppError(codes.SERVICE_UPDATE_LAYOUT_MISSING_SCREENSIZE), "error");
  }
  BREAKPOINTS_ORDER.forEach((breakpoint) => {
    if (!newLayouts[breakpoint]) {
      Log(
        new AppError(codes.SERVICE_UPDATE_LAYOUT_MISSING_BREAKPOINT),
        "error",
      );
      return;
    }
    widgetLayout = updateForScreenSize(newLayouts, widgetLayout, breakpoint);
  });

  return widgetLayout;
}

/**
 * Updates the layout values of the given AdjustedWidgetLayout[] with the given RGLayout for the given ScreenSize
 * @param {RGLayout} newLayouts new layout values for the given ScreenSize
 * @param {AdjustedWidgetLayout[]} widgetLayout AdjustedWidgetLayout[] to update
 * @param {ScreenSize} breakpoint given ScreenSize
 */
function updateForScreenSize(
  newLayouts: RGLayout,
  widgetLayout: AdjustedWidgetLayout[],
  breakpoint: ScreenSize,
) {
  newLayouts[breakpoint]?.forEach((layout) => {
    const widget = widgetLayout.find((widget) => widget.id === layout.i);
    if (!widget) {
      const error = new AppError(codes.WIDGET_NOT_FOUND);
      Log(error, "error");
      return;
    }
    widget.layout[breakpoint] = {
      x: layout.x,
      y: layout.y,
      w: layout.w,
      h: layout.h,
    };
  });
  return widgetLayout;
}
