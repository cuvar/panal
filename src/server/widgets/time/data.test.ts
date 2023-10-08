/**
 * @jest-environment node
 */

import computeTimeWidgetData from "./data";
import type { TimeWidgetConfig, TimeWidgetData } from "./types";

describe("TimeWidget data", () => {
  it("computeTimeWidgetData works correctly", () => {
    // arrange
    const input: TimeWidgetConfig = {};
    const expected: TimeWidgetData = {};
    // act
    const result = computeTimeWidgetData(input);
    // assert
    expect(result).toStrictEqual(expected);
  });
});
