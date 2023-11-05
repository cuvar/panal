/**
 * @jest-environment node
 */

import type { ScreenSizePositioning } from "~/utils/types/widget";
import { AdjustedWidgetLayout } from "../entities/adjustedWidgetLayout";
import { UserWidgetLayout } from "../entities/userWidgetLayout";
import parseUserWidgetConfig, {
  parseAdjustedWidgetConfig,
} from "./parseWidgetConfigService";

describe("parseWidgetConfigService", () => {
  it("works correctly for parsing UserWidgetLayout", () => {
    // arrange
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

    const expected = new UserWidgetLayout(layoutInput);
    const input = JSON.stringify([expected]);
    // act
    const result = parseUserWidgetConfig(input);

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

    const expected = new UserWidgetLayout(layoutInput);
    const input = JSON.stringify(expected);
    // act
    const result = parseUserWidgetConfig(input);

    // assert
    expect(result).toBeNull();
  });

  it("fails correctly for parsing UserWidgetLayout due wrong data property", () => {
    // arrange
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

    const expected = new UserWidgetLayout(layoutInput);
    const input = JSON.stringify([expected]);
    // act
    const result = parseUserWidgetConfig(input);

    // assert
    expect(result).toBeNull();
  });

  it("works correctly for parsing AdjustedWidgetLayout", () => {
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

    const expected = new AdjustedWidgetLayout(id, layoutInput);
    const input = JSON.stringify([expected]);
    // act
    const result = parseAdjustedWidgetConfig(input);

    // assert
    expect(result).not.toBeNull();
    expect(result).toStrictEqual([expected]);
  });

  it("fails correctly for parsing AdjustedWidgetLayout due of missing array", () => {
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

    const expected = new AdjustedWidgetLayout(id, layoutInput);
    const input = JSON.stringify(expected);
    // act
    const result = parseAdjustedWidgetConfig(input);

    // assert
    expect(result).toBeNull();
  });

  it("fails correctly for parsing AdjustedWidgetLayout due wrong data property", () => {
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

    const expected = new AdjustedWidgetLayout(id, layoutInput);
    const input = JSON.stringify([expected]);
    // act
    const result = parseAdjustedWidgetConfig(input);

    // assert
    expect(result).toBeNull();
  });
});
