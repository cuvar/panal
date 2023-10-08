/**
 * @jest-environment node
 */

import type GridLayout from "react-grid-layout";
import makeLayoutsStatic from "./makeLayoutsStaticService";

describe("makeLayoutsStaticService", () => {
  it("adds a static true property", () => {
    // arrange
    const input: GridLayout.Layouts = {
      xl: [{ x: 0, y: 0, w: 1, h: 1, i: "0" }],
      lg: [{ x: 1, y: 0, w: 1, h: 1, i: "1" }],
      md: [{ x: 0, y: 2, w: 1, h: 1, i: "2" }],
      sm: [{ x: 1, y: 2, w: 1, h: 0, i: "3" }],
      xs: [{ x: 0, y: 5, w: 1, h: 0, i: "4" }],
      xss: [{ x: 0, y: 2, w: 4, h: 0, i: "5" }],
    };

    const makeStatic = true;

    const expected: GridLayout.Layouts = {
      xl: [{ x: 0, y: 0, w: 1, h: 1, i: "0", static: makeStatic }],
      lg: [{ x: 1, y: 0, w: 1, h: 1, i: "1", static: makeStatic }],
      md: [{ x: 0, y: 2, w: 1, h: 1, i: "2", static: makeStatic }],
      sm: [{ x: 1, y: 2, w: 1, h: 0, i: "3", static: makeStatic }],
      xs: [{ x: 0, y: 5, w: 1, h: 0, i: "4", static: makeStatic }],
      xss: [{ x: 0, y: 2, w: 4, h: 0, i: "5", static: makeStatic }],
    };

    // act
    const result = makeLayoutsStatic(input, makeStatic);

    // assert
    expect(result).toEqual(expected);
  });

  it("adds a static false property", () => {
    // arrange
    const input: GridLayout.Layouts = {
      xl: [{ x: 0, y: 0, w: 1, h: 1, i: "0" }],
      lg: [{ x: 1, y: 0, w: 1, h: 1, i: "1" }],
      md: [{ x: 0, y: 2, w: 1, h: 1, i: "2" }],
      sm: [{ x: 1, y: 2, w: 1, h: 0, i: "3" }],
      xs: [{ x: 0, y: 5, w: 1, h: 0, i: "4" }],
      xss: [{ x: 0, y: 2, w: 4, h: 0, i: "5" }],
    };

    const makeStatic = false;

    const expected: GridLayout.Layouts = {
      xl: [{ x: 0, y: 0, w: 1, h: 1, i: "0", static: makeStatic }],
      lg: [{ x: 1, y: 0, w: 1, h: 1, i: "1", static: makeStatic }],
      md: [{ x: 0, y: 2, w: 1, h: 1, i: "2", static: makeStatic }],
      sm: [{ x: 1, y: 2, w: 1, h: 0, i: "3", static: makeStatic }],
      xs: [{ x: 0, y: 5, w: 1, h: 0, i: "4", static: makeStatic }],
      xss: [{ x: 0, y: 2, w: 4, h: 0, i: "5", static: makeStatic }],
    };

    // act
    const result = makeLayoutsStatic(input, makeStatic);

    // assert
    expect(result).toEqual(expected);
  });
});
