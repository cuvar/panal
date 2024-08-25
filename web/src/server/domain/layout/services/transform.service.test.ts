/**
 * @jest-environment node
 */

import { type AdjustedWidgetLayout } from "../adjustedWidgetLayout";
import { type UserWidgetLayout } from "../userWidgetLayout";
import uwlToAwl from "./transform.service";

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

    const input = { type: widgetType, layout: layoutInput } as UserWidgetLayout;
    const expected = {
      id: "1",
      type: widgetType,
      layout: layoutExpected,
    } as AdjustedWidgetLayout;

    // act
    const res = uwlToAwl([input])[0]!;

    // assert
    expect(typeof res.id).toBe("string");
    expect(res.layout).toStrictEqual(expected.layout);
  });
});
