/**
 * @jest-environment node
 */

import type { ScreenSizePositioning } from "~/utils/types/widget";
import { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
import { UserWidgetConfig } from "../entities/userWidgetConfig";
import parseUserWidgetConfig, {
  parseAdjustedWidgetConfig,
} from "./parseWidgetConfigService";

describe("parseWidgetConfigService", () => {
  it("works correctly for parsing UserWidgetConfig", () => {
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

    const expected = new UserWidgetConfig(widgetType, layoutInput, {});
    const input = JSON.stringify([expected]);
    // act
    const result = parseUserWidgetConfig(input);

    // assert
    expect(result).not.toBeNull();
    expect(result).toStrictEqual([expected]);
  });

  it("fails correctly for parsing UserWidgetConfig due to missing array", () => {
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

    const expected = new UserWidgetConfig(widgetType, layoutInput, {});
    const input = JSON.stringify(expected);
    // act
    const result = parseUserWidgetConfig(input);

    // assert
    expect(result).toBeNull();
  });

  it("fails correctly for parsing UserWidgetConfig due wrong data property", () => {
    // arrange
    const widgetType = "calendar";
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

    const expected = new UserWidgetConfig(widgetType, layoutInput, {});
    const input = JSON.stringify([expected]);
    // act
    const result = parseUserWidgetConfig(input);

    // assert
    expect(result).toBeNull();
  });

  it("works correctly for parsing AdjustedWidgetConfig", () => {
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

    const expected = new AdjustedWidgetConfig(id, widgetType, layoutInput, {});
    const input = JSON.stringify([expected]);
    // act
    const result = parseAdjustedWidgetConfig(input);

    // assert
    expect(result).not.toBeNull();
    expect(result).toStrictEqual([expected]);
  });

  it("fails correctly for parsing AdjustedWidgetConfig due of missing array", () => {
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

    const expected = new AdjustedWidgetConfig(id, widgetType, layoutInput, {});
    const input = JSON.stringify(expected);
    // act
    const result = parseAdjustedWidgetConfig(input);

    // assert
    expect(result).toBeNull();
  });

  it("fails correctly for parsing AdjustedWidgetConfig due wrong data property", () => {
    // arrange
    const id = "hello world";
    const widgetType = "calendar";
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

    const expected = new AdjustedWidgetConfig(id, widgetType, layoutInput, {});
    const input = JSON.stringify([expected]);
    // act
    const result = parseAdjustedWidgetConfig(input);

    // assert
    expect(result).toBeNull();
  });
});
