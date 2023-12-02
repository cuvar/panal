/**
 * @jest-environment node
 */

import {
  getMinHeightForWidget,
  getMinWidthForWidget,
} from "./computeSizeForWidgetService";

describe("computeSizeForWidgetService", () => {
  it("works correctly for width", () => {
    // arrange
    const widgetType = "calendar";

    // act
    const result = getMinWidthForWidget(widgetType);

    // assert
    expect(result).toBe(2);
  });

  it("works correctly for height", () => {
    // arrange
    const widgetType = "calendar";

    // act
    const result = getMinHeightForWidget(widgetType);

    // assert
    expect(result).toBe(1);
  });
});
