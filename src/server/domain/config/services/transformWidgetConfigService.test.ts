/**
 * @jest-environment node
 */

import type { WidgetType } from "~/utils/types/widget";
import { WidgetData } from "../widgetData";
import transformWidgetConfig from "./transformWidgetConfigService";

describe("transformWidgetConfigService", () => {
  it("works correctly", async () => {
    // arrange
    const widgetType: WidgetType = "time";

    const input: WidgetData = new WidgetData("1", widgetType, {});
    const expected = input;

    // act
    const result = await transformWidgetConfig([input]);

    // assert
    expect(result).toEqual([expected]);
  });
});
