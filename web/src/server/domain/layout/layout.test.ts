/**
 * @jest-environment node
 */

import { LayoutHelper, type Layout } from "~/server/domain/layout/layout";

describe("Layout", () => {
  it("validate works correctly", () => {
    // arrange
    const input: Layout = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };
    // act
    const result = LayoutHelper.validate(input);
    // assert
    expect(result).toBe(true);
  });

  it("validate fails correctly", () => {
    // arrange
    const input = {
      x: "0",
      y: "0",
      w: "0",
      h: 0,
    };
    // act
    const result = LayoutHelper.validate(input);
    // assert
    expect(result).toBe(false);
  });
});
