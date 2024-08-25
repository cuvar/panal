/**
 * @jest-environment node
 */

import {
  PositioningHelper,
  type Positioning,
} from "~/server/domain/positioning/positioning";

describe("Positioning", () => {
  it("validate works correctly", () => {
    // arrange
    const input: Positioning = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };
    // act
    const result = PositioningHelper.validate(input);
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
    const result = PositioningHelper.validate(input);
    // assert
    expect(result).toBe(false);
  });
});
