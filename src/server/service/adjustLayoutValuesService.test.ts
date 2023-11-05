/**
 * @jest-environment node
 */

import { BREAKPOINT_COLS, GRID_MAX_ROW } from "~/utils/const";
import type { ScreenSizePositioning, WidgetType } from "~/utils/types/widget";
import { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
import { WidgetData } from "../entities/widgetData";
import adjustLayoutValues from "./adjustLayoutValuesService";
import {
  getMinHeightForWidget,
  getMinWidthForWidget,
} from "./computeSizeForWidgetService";

describe("adjustLayoutValuesService", () => {
  it("works for WidgetData", () => {
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

    const input: WidgetData = new WidgetData("1", widgetType, layoutInput, {});

    const expected: WidgetData = new WidgetData(
      "1",
      widgetType,
      layoutExpected,
      {},
    );

    // act
    const result = adjustLayoutValues<WidgetData>(input, widgetType);

    // assert
    expect(result).toStrictEqual(expected);
  });

  it("works for AdjustedWidgetConfig", () => {
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

    const input: AdjustedWidgetConfig = new AdjustedWidgetConfig(
      "1",
      layoutInput,
    );
    const expected: AdjustedWidgetConfig = new AdjustedWidgetConfig(
      "1",
      layoutExpected,
    );

    // act
    const result = adjustLayoutValues<AdjustedWidgetConfig>(input, widgetType);

    // assert
    expect(result).toStrictEqual(expected);
  });
});
