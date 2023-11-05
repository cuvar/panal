import type GridLayout from "react-grid-layout";
import { type AdjustedWidgetLayout } from "~/server/entities/adjustedWidgetLayout";
import { isScreenSize } from "~/utils/guards/other";
import { isEmptyPositioning } from "~/utils/helper";
import {
  getMinHeightForWidget,
  getMinWidthForWidget,
} from "../../server/service/computeSizeForWidgetService";

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
