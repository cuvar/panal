/**
 * @jest-environment node
 */

import {
  PartialScreenSizePositioningHelper,
  ScreenSizePositioningHelper,
  type PartialScreenSizePositioning,
  type ScreenSizePositioning,
} from "~/server/domain/layout/screensizePositioning";

describe("ScreenSizePositioning", () => {
  it("validate works correctly", () => {
    // arrange
    const input: ScreenSizePositioning = {
      xl: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      lg: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      md: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      sm: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xs: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xss: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
    };
    // act
    const result = ScreenSizePositioningHelper.validate(input);
    // assert
    expect(result).toBe(true);
  });

  it("validate fails correctly", () => {
    // arrange
    const input = {
      xl: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xss: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
    };
    // act
    const result = ScreenSizePositioningHelper.validate(input);
    // assert
    expect(result).toBe(false);
  });
});

describe("PartialScreenSizePositioning", () => {
  it("validate works correctly", () => {
    // arrange
    const input: PartialScreenSizePositioning = {
      lg: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      md: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      sm: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xs: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xss: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
    };
    // act
    const result = PartialScreenSizePositioningHelper.validate(input);
    // assert
    expect(result).toBe(true);
  });

  it("validate fails correctly", () => {
    // arrange
    const input = {
      oh: "no",
    };
    // act
    const result = PartialScreenSizePositioningHelper.validate(input);
    // assert
    expect(result).toBe(false);
  });
});
