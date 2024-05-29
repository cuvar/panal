/**
 * @jest-environment node
 */

import type { ScreenSizePositioning } from "~/lib/types/widget";
import getHidingClasses from "./getHidingClassesService";

describe("getHidingClassesService", () => {
  it("should return an empty string array", () => {
    // arrange
    const input: ScreenSizePositioning = {
      xl: {
        x: 0,
        y: 0,
        w: 1,
        h: 1,
      },
      lg: {
        x: 0,
        y: 0,
        w: 2,
        h: 2,
      },
      md: {
        x: 0,
        y: 0,
        w: 3,
        h: 3,
      },
      sm: {
        x: 0,
        y: 0,
        w: 4,
        h: 4,
      },
      xs: {
        x: 0,
        y: 0,
        w: 5,
        h: 5,
      },
      xss: {
        x: 0,
        y: 0,
        w: 6,
        h: 6,
      },
    };

    // act
    const result = getHidingClasses(input);

    // assert
    // expect(result.length).toEqual(0);
    expect(result.length).toEqual(0);
  });
  it("should return an string array", () => {
    // arrange
    const input: ScreenSizePositioning = {
      xl: {
        x: 0,
        y: 0,
        w: 1,
        h: 1,
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
        w: 4,
        h: 4,
      },
      xs: {
        x: 0,
        y: 0,
        w: 5,
        h: 5,
      },
      xss: {
        x: 0,
        y: 0,
        w: 6,
        h: 6,
      },
    };

    const expected = ["lg", "md"];

    // act
    const result = getHidingClasses(input);

    // assert
    // expect(result.length).toEqual(0);
    expect(result.length).toEqual(2);
    expect(result).toEqual(expected);
  });
});
