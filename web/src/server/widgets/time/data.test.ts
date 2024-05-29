/**
 * @jest-environment node
 */

import computeDataTimeWidget from "./data";
import type { TimeWidgetConfig, TimeWidgetData } from "./types";

describe("TimeWidget data", () => {
  it("computeDataTimeWidget works correctly", () => {
    // arrange
    const input: TimeWidgetConfig = {};
    const expected: TimeWidgetData = {};
    // act
    const result = computeDataTimeWidget(input);
    // assert
    expect(result).toStrictEqual(expected);
  });
});
