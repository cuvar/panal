import type ReactGridLayout from "react-grid-layout";
import addMissingLayouts from "~/application/layout/addMissingLayouts.service";
import adjustLayoutValues from "~/application/layout/adjustLayoutValues.service";
import {
  getMinHeightForWidget,
  getMinWidthForWidget,
} from "~/application/layout/computeSizeForWidget.service";
import { generateUniqueID } from "~/application/widget.service";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import { type RGLayout } from "~/server/domain/layout/layout";
import { type LayoutType } from "~/server/domain/layout/layoutType";
import { type WidgetType } from "../../config/widgetType";
import { ScreenSizeHelper, type ScreenSize } from "../../other/screenSize";
import { isEmptyPositioning } from "../../positioning/positioning.service";
import { type ScreenSizePositioning } from "../../positioning/screensizePositioning";
import { type AdjustedWidgetLayout } from "../adjustedWidgetLayout";
import type { UserWidgetLayout } from "../userWidgetLayout";

/**
 * Transforms the given UserWidgetLayout[] into an AdjustedWidgetLayout[]
 * @param {UserWidgetLayout[]} userWidgetLayout UserWidgetLayout[] to transform
 * @returns {AdjustedWidgetLayout[]} AdjustedWidgetLayout[] with unique IDs
 */
export function uwlToAwl(
  userWidgetLayout: UserWidgetLayout[],
): AdjustedWidgetLayout[] {
  try {
    const adjustedWidgetLayout: AdjustedWidgetLayout[] = [];
    for (const widget of userWidgetLayout) {
      const withMissingLayouts = addMissingLayouts(widget.layout);
      const wId = "id" in widget ? (widget.id as string) : generateUniqueID();

      const adjustedConfig = {
        id: wId,
        type: widget.type,
        layout: withMissingLayouts,
      } as AdjustedWidgetLayout;
      const adjusted = adjustLayoutValues(adjustedConfig);
      adjustedWidgetLayout.push(adjusted);
    }

    return adjustedWidgetLayout;
  } catch (error) {
    throw new AppError(codes.SERVICE_TRANSFORM_CONFIG_FAILED, error);
  }
}

/**
 * Transforms AdjustedWidgetLayout[] into RGLayout for react-grid-layout
 * @param {AdjustedWidgetLayout[]} data AdjustedWidgetLayout array to transform
 * @param {boolean} makeStatic Indicates if the widgets should be static or not
 * @returns {RGLayout} transformed layouts
 */
export function awlToRgl(
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
    Object.entries(widget.layout).forEach(([screen, value]) => {
      const layout = withMinValues<ReactGridLayout.Layout>(
        {
          ...value,
          i: widget.id,
          static: makeStatic,
        },
        widget.type,
        screen as ScreenSize,
      );

      if (
        layouts[screen] !== undefined &&
        ScreenSizeHelper.validate(screen) &&
        Array.isArray(layouts[screen]) &&
        !isEmptyPositioning(layout)
      ) {
        layouts[screen]?.push(layout);
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
export function rglToAwl(
  data: RGLayout,
  layoutTypes: LayoutType[],
): AdjustedWidgetLayout[] {
  const awl: AdjustedWidgetLayout[] = [];

  const entries = Object.entries(data);
  const groupedById = entries.reduce(
    (acc, [screenSize, layoutArray]) => {
      if (
        !ScreenSizeHelper.validate(screenSize) ||
        !Array.isArray(layoutArray)
      ) {
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
    const widget = {
      id: id,
      type: type,
      layout: withMissingLayouts,
    } as AdjustedWidgetLayout;
    awl.push(widget);
  });

  return awl;
}

/**
 * Adds min values to the layout of a widget
 * @param data
 * @param type
 * @param screenSize
 */
export function withMinValues<T>(
  data: T,
  type: WidgetType,
  screenSize: ScreenSize,
): T & { minW: number; minH: number } {
  return {
    ...data,
    minW: getMinWidthForWidget(type, screenSize),
    minH: getMinHeightForWidget(type, screenSize),
  };
}
