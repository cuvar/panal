import type GridLayout from "react-grid-layout";
import type { WidgetData } from "~/utils/types/widget";
import {
  getMinHeightForWidget,
  getMinWidthForWidget,
} from "./computeSizeForWidgetService";
import { isScreenSize } from "~/utils/guards/other";
import addMissingLayouts from "./addMissingLayoutsService";

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

  // todo: problem 2: wie hide ich widgets auf bestimmten screen sizes? -> im jeweiligen widget über "hidden" tw class regeln für jede screen size
  const newData = data.map((widget) => {
    const newLayout = addMissingLayouts(widget.layout);
    return {
      ...widget,
      layout: newLayout,
    };
  });
  // todo: check for semantic correctness of values
  newData.forEach((widget) => {
    Object.entries(widget.layout).forEach(([key, value]) => {
      const layout = {
        i: widget.id,
        x: value.x,
        y: value.y,
        w: value.w,
        h: value.h,
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
