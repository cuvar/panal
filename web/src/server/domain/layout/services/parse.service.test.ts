/**
 * @jest-environment node
 */

import { type AdjustedWidgetLayout } from "../../layout/adjustedWidgetLayout";
import { type UserWidgetLayout } from "../../layout/userWidgetLayout";
import { type ScreenSizePositioning } from "../../positioning/screensizePositioning";
import {
  parseAdjustedWidgetLayout,
  parseUserWidgetLayout,
} from "./parse.service";

describe("parseWidgetConfigService", () => {
  it("works correctly for parsing UserWidgetLayout", () => {
    // arrange
    const widgetType = "time";
    const layoutInput = {
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
    };

    const expected: UserWidgetLayout = {
      type: widgetType,
      layout: layoutInput,
    };
    const input = JSON.stringify([expected]);
    // act
    const result = parseUserWidgetLayout(input);

    // assert
    expect(result).not.toBeNull();
    expect(result).toStrictEqual([expected]);
  });

  it("fails correctly for parsing UserWidgetLayout due to missing array", () => {
    // arrange
    const widgetType = "time";
    const layoutInput = {
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
    };

    const expected: UserWidgetLayout = {
      type: widgetType,
      layout: layoutInput,
    };
    const input = JSON.stringify(expected);
    // act
    const result = parseUserWidgetLayout(input);

    // assert
    expect(result).toBeNull();
  });

  it("works correctly for parsing AdjustedWidgetLayout", () => {
    // arrange
    const id = "hello world";
    const widgetType = "time";
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

    const expected: AdjustedWidgetLayout = {
      id,
      type: widgetType,
      layout: layoutInput,
    };
    const input = JSON.stringify([expected]);
    // act
    const result = parseAdjustedWidgetLayout(input);

    // assert
    expect(result).not.toBeNull();
    expect(result).toStrictEqual([expected]);
  });

  it("fails correctly for parsing AdjustedWidgetLayout due of missing array", () => {
    // arrange
    const id = "hello world";
    const widgetType = "time";
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

    const expected: AdjustedWidgetLayout = {
      id: id,
      type: widgetType,
      layout: layoutInput,
    };
    const input = JSON.stringify(expected);
    // act
    const result = parseAdjustedWidgetLayout(input);

    // assert
    expect(result).toBeNull();
  });
});
