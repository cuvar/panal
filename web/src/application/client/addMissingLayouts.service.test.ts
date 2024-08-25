/**
 * @jest-environment node
 */

import { describe, expect, test } from "@jest/globals";
import type { ScreenSize } from "~/lib/types/types";
import type {
  Layout,
  PartialScreenSizePositioning,
  ScreenSizePositioning,
} from "~/lib/types/widget";
import addMissingLayouts, {
  getReplacementScreenSize,
} from "./addMissingLayouts.service";

describe("addMissingLayoutservice", () => {
  test("works for single Positioning input", () => {
    // arrange
    const input: Layout = {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    };

    const expected: ScreenSizePositioning = {
      xl: input,
      lg: input,
      md: input,
      sm: input,
      xs: input,
      xss: input,
    };
    // act
    const result = addMissingLayouts(input);
    // assert
    expect(result).toEqual(expected);
  });

  test("works for ScreenSizePositioning input", () => {
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

    const expected: ScreenSizePositioning = input;
    // act
    const result = addMissingLayouts(input);
    // assert
    expect(result).toEqual(expected);
  });

  test("works for PartialScreenSizePositioning input", () => {
    // arrange
    const input: PartialScreenSizePositioning = {
      lg: {
        x: 0,
        y: 0,
        w: 1,
        h: 1,
      },
      md: {
        x: 0,
        y: 0,
        w: 2,
        h: 2,
      },
      sm: {
        x: 0,
        y: 0,
        w: 3,
        h: 3,
      },
    };

    const expected: ScreenSizePositioning = {
      xl: {
        x: 0,
        y: 0,
        w: 1,
        h: 1,
      },
      lg: {
        x: 0,
        y: 0,
        w: 1,
        h: 1,
      },
      md: {
        x: 0,
        y: 0,
        w: 2,
        h: 2,
      },
      sm: {
        x: 0,
        y: 0,
        w: 3,
        h: 3,
      },
      xs: {
        x: 0,
        y: 0,
        w: 3,
        h: 3,
      },
      xss: {
        x: 0,
        y: 0,
        w: 3,
        h: 3,
      },
    };
    // % 1. take the values of the next breakpoint above it
    // % 2. except if there are no breakpoints above it, then take the values of the next breakpoint below it
    // -> xl = lg, xs = sm, xss = sm

    // act
    const result = addMissingLayouts(input);
    // assert
    expect(result).toEqual(expected);
  });
});

describe("addMissingLayoutservice", () => {
  // arrange
  const defined: ScreenSize[] = ["lg", "md", "sm"];
  type Data = {
    missing: ScreenSize;
    replacement: ScreenSize;
  };

  const expected: Data[] = [
    {
      missing: "xl",
      replacement: "lg",
    },
    {
      missing: "xs",
      replacement: "sm",
    },
    {
      missing: "xss",
      replacement: "sm",
    },
  ];

  // act
  it.each(expected)(
    "gets right replacement screen size",
    ({ missing, replacement }) => {
      const result = getReplacementScreenSize(defined, missing);
      expect(result).toEqual(replacement);
    },
  );
});
