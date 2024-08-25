/**
 * @jest-environment node
 */

import { type WidgetData } from "../widgetData";
import { type WidgetType } from "../widgetType";
import transformWidgetConfig from "./transform.service";

describe("transformWidgetConfigService", () => {
  it("works correctly", async () => {
    // arrange
    const widgetType: WidgetType = "time";

    const input: WidgetData = { id: "1", type: widgetType, data: {} };
    const expected = input;

    // act
    const result = await transformWidgetConfig([input]);

    // assert
    expect(result).toEqual([expected]);
  });
});
