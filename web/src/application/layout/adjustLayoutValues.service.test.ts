/**
 * @jest-environment node
 */

import { BREAKPOINT_COLS, GRID_MAX_ROW } from "~/lib/basic/const";
import type { ScreenSizePositioning, WidgetType } from "~/lib/types/widget";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import adjustLayoutValues from "./adjustLayoutValues.service";
import {
  getMinHeightForWidget,
  getMinWidthForWidget,
} from "./computeSizeForWidget.service";

describe("adjustLayoutValuesService", () => {
  it("works for AdjustedWidgetLayout", () => {
    // arrange
    const widgetType: WidgetType = "time";
    const minWidth = getMinWidthForWidget(widgetType);
    const minHeight = getMinHeightForWidget(widgetType);
    const layoutInput: ScreenSizePositioning = {
      xl: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      lg: {
        x: 0,
        y: 0,
        w: minWidth - 1,
        h: minHeight - 1,
      },
      md: {
        x: 0,
        y: 0,
        w: BREAKPOINT_COLS.md + 1,
        h: minHeight,
      },
      sm: {
        x: 0,
        y: 0,
        w: -2,
        h: -2,
      },
      xs: {
        x: 0,
        y: GRID_MAX_ROW + 1,
        w: 5,
        h: 5,
      },
      xss: {
        x: -2,
        y: -3,
        w: 1,
        h: 1,
      },
    };
    const layoutExpected: ScreenSizePositioning = {
      xl: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      lg: {
        x: 0,
        y: 0,
        w: minWidth,
        h: minHeight,
      },
      md: {
        x: 0,
        y: 0,
        w: BREAKPOINT_COLS.md > minWidth ? BREAKPOINT_COLS.md : minWidth,
        h: minHeight,
      },
      sm: {
        x: 0,
        y: 0,
        w: minWidth,
        h: minHeight,
      },
      xs: {
        x: 0,
        y: GRID_MAX_ROW - 1,
        w: 3,
        h: 5,
      },
      xss: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
    };

    const input: AdjustedWidgetLayout = {
      id: "1",
      type: widgetType,
      layout: layoutInput,
    };
    const expected: AdjustedWidgetLayout = {
      id: "1",
      type: widgetType,
      layout: layoutExpected,
    };

    // act
    const result = adjustLayoutValues(input);

    // assert
    expect(result).toStrictEqual(expected);
  });
});
