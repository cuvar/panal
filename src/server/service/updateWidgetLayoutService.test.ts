/**
 * @jest-environment node
 */

import type GridLayout from "react-grid-layout";
import type { ScreenSizePositioning } from "~/utils/types/widget";
import { AdjustedWidgetLayout } from "../entities/adjustedWidgetConfig";
import updateWidgetLayoutService from "./updateWidgetLayoutService";

describe("updateWidgetLayoutService", () => {
  it("works correctly for updating widget layout", () => {
    // arrange
    const id = "hello world";
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
        w: 0,
        h: 0,
      },
      md: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      sm: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xs: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xss: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
    };
    const widgetConfig: AdjustedWidgetLayout = new AdjustedWidgetLayout(
      id,
      layoutInput,
    );
    const newLayouts: GridLayout.Layouts = {
      xl: [],
      lg: [{ i: id, x: 1, y: 2, w: 3, h: 4 }],
      md: [],
      sm: [],
      xs: [],
      xss: [],
    };
    const layoutExpected: ScreenSizePositioning = structuredClone(layoutInput);
    layoutExpected.lg = {
      x: newLayouts.lg![0]!.x,
      y: newLayouts.lg![0]!.y,
      w: newLayouts.lg![0]!.w,
      h: newLayouts.lg![0]!.h,
    };

    const expected: AdjustedWidgetLayout = new AdjustedWidgetLayout(
      id,
      layoutExpected,
    );

    // act
    const result = updateWidgetLayoutService(newLayouts, [widgetConfig]);

    // assert
    expect(result).not.toBeNull();
    expect(result[0]?.layout).toEqual(expected.layout);
  });

  it("works correctly for wrong newLayouts", () => {
    // arrange
    const id = "hello world";
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
        w: 0,
        h: 0,
      },
      md: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      sm: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xs: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xss: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
    };
    const widgetConfig: AdjustedWidgetLayout = new AdjustedWidgetLayout(
      id,
      layoutInput,
    );
    const newLayouts: GridLayout.Layouts = {
      xl: [],
      lg: [{ i: id, x: 1, y: 2, w: 3, h: 4 }],
      md: [],
      sm: [],
    };

    // act
    const result = updateWidgetLayoutService(newLayouts, [widgetConfig]);

    // assert
    expect(result[0]).toBe(widgetConfig);
  });

  it("works correctly for updating widget layout", () => {
    // arrange
    const id = "hello world";
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
        w: 0,
        h: 0,
      },
      md: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      sm: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xs: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xss: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
    };
    const widgetConfig: AdjustedWidgetLayout = new AdjustedWidgetLayout(
      id,
      layoutInput,
    );
    const newLayouts: GridLayout.Layouts = {
      xl: [],
      lg: [{ i: id + "any string", x: 1, y: 2, w: 3, h: 4 }],
      md: [],
      sm: [],
      xs: [],
      xss: [],
    };

    // act
    const result = updateWidgetLayoutService(newLayouts, [widgetConfig]);
    // assert
    expect(result[0]).toBe(widgetConfig);
  });
});
