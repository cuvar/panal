/**
 * @jest-environment node
 */

import {
  isEmptyPositioning,
  overlaps,
} from "./positioning.service";

describe("helper functions", () => {
  it("isEmptyPositioning works correctly", () => {
    // arrange
    const input = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };
    // act
    const result = isEmptyPositioning(input);
    // assert
    expect(result).toBe(true);
  });

  it("isEmptyPositioning fails correctly", () => {
    // arrange
    const input = {
      x: 0,
      y: 0,
      w: 0,
      h: 1,
    };
    // act
    const result = isEmptyPositioning(input);
    // assert
    expect(result).toBe(false);
  });

  it("overlaps works correctly when widgets do overlap", () => {
    // arrange
    const w1 = {
      x: 0,
      y: 0,
      w: 2,
      h: 2,
    };
    const w2 = {
      x: 1,
      y: 1,
      w: 2,
      h: 2,
    };
    // act
    const result = overlaps(w1, w2);
    // assert
    expect(result).toBe(true);
  });

  it("overlaps works correctly when widgets do not overlap", () => {
    // arrange
    const w1 = {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    };
    const w2 = {
      x: 2,
      y: 2,
      w: 1,
      h: 1,
    };
    // act
    const result = overlaps(w1, w2);
    // assert
    expect(result).toBe(false);
  });
});
