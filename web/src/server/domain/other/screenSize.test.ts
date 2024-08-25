/**
 * @jest-environment node
 */

import { ScreenSizeHelper } from "../other/screenSize";

describe("guards - other:", () => {
  it("isScreenSize works correctly", () => {
    // arrange
    const input = "xss";
    // act
    const result = ScreenSizeHelper.validate(input);
    // assert
    expect(result).toBe(true);
  });
  it("isScreenSize fails correctly", () => {
    // arrange
    const input = "lxx";
    // act
    const result = ScreenSizeHelper.validate(input);
    // assert
    expect(result).toBe(false);
  });
});
