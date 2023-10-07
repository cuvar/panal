import type GridLayout from "react-grid-layout";
import { isScreenSize } from "~/utils/guards/other";
import { isEmptyPositioning } from "~/utils/helper";
import type { WidgetData } from "../../server/entities/widgetData";
import {
  getMinHeightForWidget,
  getMinWidthForWidget,
} from "../../server/service/computeSizeForWidgetService";

export default function transformLayoutsForGrid(
  data: WidgetData[],
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
