/**
 * @jest-environment node
 */

import { isTimeWidgetConfig, isTimeWidgetData } from "./guards";
import type { TimeWidgetConfig } from "./types";

describe("TimeWidget guards", () => {
  it("isTimeWidgetConfig works correctly", () => {
    // arrange
    const input: TimeWidgetConfig = {};
    // act
    const result = isTimeWidgetConfig(input);
    // assert
    expect(result).toBe(true);
  });

  it("isTimeWidgetConfig fails correctly", () => {
    // arrange
    const input = "hello";
    // act
    const result = isTimeWidgetConfig(input);
    // assert
    expect(result).toBe(false);
  });

  it("isTimeWidgetData works correctly", () => {
    // arrange
    const input: TimeWidgetConfig = {};
    // act
    const result = isTimeWidgetData(input);
    // assert
    expect(result).toBe(true);
  });

  it("isTimeWidgetData fails correctly", () => {
    // arrange
    const input = "hello";
    // act
    const result = isTimeWidgetData(input);
    // assert
    expect(result).toBe(false);
  });
});
