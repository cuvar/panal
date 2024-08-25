/**
 * @jest-environment node
 */

import { WidgetTypeHelper } from "./widgetType";

describe("WidgetType", () => {
  it("validate fails correctly", () => {
    // arrange
    const input = "oh-no";
    // act
    const result = WidgetTypeHelper.validate(input);
    // assert
    expect(result).toBe(false);
  });

  it.each(["calendar", "search", "links", "time"])(
    "isWidgetType works correctly",
    (input) => {
      // act
      const result = WidgetTypeHelper.validate(input);
      // assert
      expect(result).toBe(true);
    },
  );
});
