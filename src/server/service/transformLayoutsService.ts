import type GridLayout from "react-grid-layout";
import { isScreenSize } from "~/utils/guards/other";
import type { WidgetData } from "~/utils/types/widget";
import addMissingLayouts from "./addMissingLayoutsService";
import adjustLayoutValues from "./adjustLayoutValuesService";
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

  // todo: problem 2: wie hide ich widgets auf bestimmten screen sizes? -> im jeweiligen widget über "hidden" tw class regeln für jede screen size
  const completeLayouts: WidgetData[] = data.map((widget) => {
    const newLayout = addMissingLayouts(widget.layout);
    return {
      ...widget,
      layout: newLayout,
    };
  });

  const adjustedLayouts = adjustLayoutValues<WidgetData>(completeLayouts);

  adjustedLayouts.forEach((widget) => {
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
