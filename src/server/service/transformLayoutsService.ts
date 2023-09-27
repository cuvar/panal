import type GridLayout from "react-grid-layout";
import type { WidgetData } from "~/utils/types/widget";

export default function transformLayoutsForGrid(
  data: WidgetData[],
): GridLayout.Layouts {
  const layouts: GridLayout.Layouts = {
    lg: [
      { i: "time", x: 0, y: 1, w: 2, h: 1, minW: 2 },
      { i: "search", x: 0, y: 2, w: 3, h: 1, minW: 3 },
      { i: "link", x: 0, y: 3, w: 4, h: 1, minW: 4 },
      { i: "cal", x: 0, y: 4, w: 2, h: 2, minW: 2 },
    ],
    md: [
      { i: "time", x: 0, y: 1, w: 2, h: 1, minW: 1 },
      { i: "search", x: 0, y: 2, w: 3, h: 1, minW: 3 },
      { i: "link", x: 0, y: 3, w: 3, h: 1, minW: 3 },
      { i: "cal", x: 0, y: 4, w: 2, h: 2, minW: 2 },
    ],
    sm: [
      { i: "time", x: 0, y: 1, w: 1, h: 1, minW: 1 },
      { i: "search", x: 0, y: 2, w: 2, h: 1, minW: 2 },
      { i: "link", x: 0, y: 3, w: 3, h: 1, minW: 3 },
      { i: "cal", x: 0, y: 4, w: 1, h: 2, minW: 1 },
    ],
    xs: [
      { i: "time", x: 0, y: 1, w: 3, h: 1, minW: 3 },
      { i: "search", x: 0, y: 2, w: 3, h: 1, minW: 3 },
      { i: "link", x: 0, y: 3, w: 3, h: 1, minW: 3 },
      { i: "cal", x: 0, y: 4, w: 3, h: 2, minW: 3 },
    ],
  };
  return layouts;
}
