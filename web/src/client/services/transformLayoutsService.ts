import type GridLayout from "react-grid-layout";
import { isScreenSize } from "~/lib/guards/other";
import { isEmptyPositioning } from "~/lib/service/positioning.service";
import { type ScreenSize } from "~/lib/types/types";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import {
  getMinHeightForWidget,
  getMinWidthForWidget,
} from "../../server/domain/layout/services/computeSizeForWidgetService";

/**
 * Transforms AdjustedWidgetLayout[] into GridLayout.Layouts for react-grid-layout
 * @param {AdjustedWidgetLayout[]} data AdjustedWidgetLayout array to transform
 * @param {boolean} makeStatic Indicates if the widgets should be static or not
 * @returns {GridLayout.Layouts} transformed layouts
 */
export default function transformLayoutsForGrid(
  data: AdjustedWidgetLayout[],
  makeStatic: boolean,
): GridLayout.Layouts {
  const layouts: GridLayout.Layouts = {
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
  layouts: GridLayout.Layouts,
  makeStatic: boolean,
): GridLayout.Layouts {
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
