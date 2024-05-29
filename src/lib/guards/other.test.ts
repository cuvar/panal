/**
 * @jest-environment node
 */

import { isScreenSize } from "./other";

describe("guards - other:", () => {
  it("isScreenSize works correctly", () => {
    // arrange
    const input = "xss";
    // act
    const result = isScreenSize(input);
    // assert
    expect(result).toBe(true);
  });
  it("isScreenSize fails correctly", () => {
    // arrange
    const input = "lxx";
    // act
    const result = isScreenSize(input);
    // assert
    expect(result).toBe(false);
  });
});
