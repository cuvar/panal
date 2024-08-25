import type ReactGridLayout from "react-grid-layout";
import { isScreenSize } from "~/lib/guards/other";
import { isEmptyPositioning } from "~/lib/service/positioning.service";
import { type ScreenSize } from "~/lib/types/types";
import {
  type LayoutType,
  type RGLayout,
  type ScreenSizePositioning,
  type WidgetType,
} from "~/lib/types/widget";
import { AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import {
  getMinHeightForWidget,
  getMinWidthForWidget,
} from "~/server/domain/layout/services/computeSizeForWidget.service";
import addMissingLayouts from "./addMissingLayouts.service";

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
      const layout = withMinValues<ReactGridLayout.Layout>(
        {
          ...value,
          i: widget.id,
          static: makeStatic,
        },
        widget.type,
      );

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
 * Transforms a given React-Grid-Layout layout into an AdjustedWidgetLayout array
 * @param {RGLayout} data Layout to transform
 * @param {LayoutType[]} layoutTypes Layout with types to transform
 * @returns {AdjustedWidgetLayout[]} Transformed layout
 */
export function transformRGLToAWL(
  data: RGLayout,
  layoutTypes: LayoutType[],
): AdjustedWidgetLayout[] {
  const awl: AdjustedWidgetLayout[] = [];

  const entries = Object.entries(data);
  const groupedById = entries.reduce(
    (acc, [screenSize, layoutArray]) => {
      if (!isScreenSize(screenSize) || !Array.isArray(layoutArray)) {
        return acc;
      }

      layoutArray.forEach((layout) => {
        if (layout.i === undefined) return;

        if (acc[layout.i] === undefined) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          acc[layout.i] = {};
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (acc[layout.i] as object)[screenSize] = layout;
      });

      return acc;
    },
    {} as Record<string, Record<ScreenSize, ReactGridLayout.Layout>>,
  );

  Object.entries(groupedById).forEach((entry) => {
    const id = entry[0];
    const layoutObject = entry[1];

    const type = layoutTypes.find((item) => item.id === id)?.type;

    if (type === undefined) return;

    const filteredLayoutObject = Object.entries(layoutObject).reduce(
      (acc, layout) => {
        const screenSize = layout[0] as ScreenSize;
        const layoutValue = layout[1];

        acc[screenSize] = {
          h: layoutValue.h,
          w: layoutValue.w,
          x: layoutValue.x,
          y: layoutValue.y,
        };
        return acc;
      },
      {} as ScreenSizePositioning,
    );
    const withMissingLayouts = addMissingLayouts(filteredLayoutObject, false);
    const widget = new AdjustedWidgetLayout(id, type, withMissingLayouts);
    awl.push(widget);
  });

  return awl;
}

/**
 * Adds min values to the layout of a widget
 * @param data
 * @param type
 */
export function withMinValues<T>(
  data: T,
  type: WidgetType,
): T & { minW: number; minH: number } {
  return {
    ...data,
    minW: getMinWidthForWidget(type),
    minH: getMinHeightForWidget(type),
  };
}
