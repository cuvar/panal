/**
 * @jest-environment node
 */

import { AdjustedWidgetLayout } from "../adjustedWidgetLayout";
import { UserWidgetLayout } from "../userWidgetLayout";
import transformWidgetLayout from "./transformWidgetLayout.service";

describe("transformWidgetLayoutService", () => {
  it("works correctly", () => {
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

    const input = new UserWidgetLayout(widgetType, layoutInput);
    const expected = new AdjustedWidgetLayout("1", widgetType, layoutExpected);

    // act
    const res = transformWidgetLayout([input])[0]!;

    // assert
    expect(typeof res.id).toBe("string");
    expect(res.layout).toStrictEqual(expected.layout);
  });
});
