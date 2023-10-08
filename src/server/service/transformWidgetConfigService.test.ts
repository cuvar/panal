/**
 * @jest-environment node
 */

import { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
import { UserWidgetConfig } from "../entities/userWidgetConfig";
import transformWidgetConfig from "./transformWidgetConfigService";

describe("transformWidgetConfigService", () => {
  it("works correctly", () => {
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

    const layoutExpected = {
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

    const input = new UserWidgetConfig(widgetType, layoutInput, {});
    const expected = new AdjustedWidgetConfig(
      "1",
      widgetType,
      layoutExpected,
      {},
    );

    // act
    const result = transformWidgetConfig([input])[0]!;

    // assert
    expect(typeof result.id).toBe("string");
    expect(result.type).toEqual(expected.type);
    expect(result.layout).toEqual(expected.layout);
    expect(result.data).toEqual(expected.data);
  });
});
