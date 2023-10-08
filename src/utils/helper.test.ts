/**
 * @jest-environment node
 */

import { generateUniqueID, isEmptyPositioning, isSameSet } from "./helper";

describe("helper functions", () => {
  it("generateUniqueID works correctly", () => {
    // arrange
    // act
    const result = generateUniqueID();
    // assert
    expect(result).toHaveLength(24);
  });

  it("isSameSet works correctly", () => {
    // arrange
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    // act
    const result = isSameSet(arr1, arr2);
    // assert
    expect(result).toBe(true);
  });

  it("isSameSet fails correctly", () => {
    // arrange
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 4];
    // act
    const result = isSameSet(arr1, arr2);
    // assert
    expect(result).toBe(false);
  });

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
});
