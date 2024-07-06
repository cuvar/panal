import { isScreenSize } from "~/lib/guards/other";
import { isEmptyPositioning } from "~/lib/service/positioning.service";
import { type RGLayout, type ScreenSize } from "~/lib/types/types";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import {
  getMinHeightForWidget,
  getMinWidthForWidget,
} from "../../server/domain/layout/services/computeSizeForWidgetService";

/**
 * Transforms AdjustedWidgetLayout[] into RGLayout for react-grid-layout
 * @param {AdjustedWidgetLayout[]} data AdjustedWidgetLayout array to transform
 * @param {boolean} makeStatic Indicates if the widgets should be static or not
 * @returns {RGLayout} transformed layouts
 */
export default function transformLayoutsForGrid(
  data: AdjustedWidgetLayout[],
  makeStatic: boolean,
): RGLayout {
  const layouts: RGLayout = {
    xl: [],
    lg: [],
    md: [],
    sm: [],
    xs: [],
    xss: [],
  };

  data.forEach((widget) => {
    Object.entries(widget.layout).forEach(([key, value]) => {
      const layout = {
        ...value,
        i: widget.id,
        minW: getMinWidthForWidget(widget.type),
        minH: getMinHeightForWidget(widget.type),
        static: makeStatic,
      };

      if (
        layouts[key] !== undefined &&
        isScreenSize(key) &&
        Array.isArray(layouts[key]) &&
        !isEmptyPositioning(layout)
      ) {
        layouts[key]?.push(layout);
      }
    });
  });
  return layouts;
}

/**
 *
 * @param widget
 * @param screenSize
 * @param layouts
 * @param makeStatic
 */
export function addWidgetToScreenSize(
  widget: AdjustedWidgetLayout,
  screenSize: ScreenSize,
  layouts: RGLayout,
  makeStatic: boolean,
): RGLayout {
  const layout = {
    ...widget.layout[screenSize],
    i: widget.id,
    minW: getMinWidthForWidget(widget.type),
    minH: getMinHeightForWidget(widget.type),
    static: makeStatic,
  };

  if (
    layouts[screenSize] !== undefined &&
    isScreenSize(screenSize) &&
    Array.isArray(layouts[screenSize]) &&
    !isEmptyPositioning(layout)
  ) {
    layouts[screenSize]!.push(layout);
  }
  return layouts;
}
