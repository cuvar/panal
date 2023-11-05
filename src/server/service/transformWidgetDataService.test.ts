/**
 * @jest-environment node
 */

import type { ScreenSizePositioning, WidgetType } from "~/utils/types/widget";
import { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
import transformWidgetData from "./transformWidgetDataService";

describe("transformWidgetDataService", () => {
  it("works correctly", async () => {
    // arrange
    const widgetType: WidgetType = "time";
    const layout: ScreenSizePositioning = {
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

    const input: AdjustedWidgetConfig = new AdjustedWidgetConfig(
      "1",
      widgetType,
      {},
    );
    const expected = input;

    // act
    const result = await transformWidgetData([input]);

    // assert
    expect(result).toEqual([expected]);
  });
});
