import type GridLayout from "react-grid-layout";
import { isScreenSize } from "~/utils/guards/other";
import type { WidgetData } from "~/utils/types/widget";
import {
  getMinHeightForWidget,
  getMinWidthForWidget,
} from "./computeSizeForWidgetService";

// todo: write tests
export default function transformLayoutsForGrid(
  data: WidgetData[],
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
      };

      if (
        layouts[key] !== undefined &&
        isScreenSize(key) &&
        Array.isArray(layouts[key])
      ) {
        layouts[key]?.push(layout);
      }
    });
  });
  return layouts;
}
