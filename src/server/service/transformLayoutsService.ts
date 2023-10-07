import type GridLayout from "react-grid-layout";
import { isScreenSize } from "~/utils/guards/other";
import type { Positioning, WidgetData } from "~/utils/types/widget";
import {
  getMinHeightForWidget,
  getMinWidthForWidget,
} from "./computeSizeForWidgetService";

// todo: write tests
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

function isEmptyPositioning(positioning: Positioning): boolean {
  return (
    positioning.h === 0 &&
    positioning.w === 0 &&
    positioning.x === 0 &&
    positioning.y === 0
  );
}
