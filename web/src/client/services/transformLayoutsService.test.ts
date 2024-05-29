/**
 * @jest-environment node
 */

import type GridLayout from "react-grid-layout";
import { AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import transformLayoutsForGrid from "./transformLayoutsService";

describe("transformLayoutsService", () => {
  it("transforms correctly into gridlayout with static: true", () => {
    // arrange
    const widgetData1 = new AdjustedWidgetLayout("1", "time", {
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
    });
    const widgetData2 = new AdjustedWidgetLayout("2", "time", {
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
    });

    const input: AdjustedWidgetLayout[] = [widgetData1, widgetData2];
    const makeStatic = true;
    const expected: GridLayout.Layouts = {
      xl: [
        {
          ...input[0]!.layout.xl,
          i: "1",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
        {
          ...input[1]!.layout.xl,
          i: "2",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
      ],
      lg: [
        {
          ...input[0]!.layout.lg,
          i: "1",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
        {
          ...input[1]!.layout.lg,
          i: "2",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
      ],
      md: [
        {
          ...input[0]!.layout.md,
          i: "1",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
        {
          ...input[1]!.layout.md,
          i: "2",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
      ],
      sm: [
        {
          ...input[0]!.layout.sm,
          i: "1",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
        {
          ...input[1]!.layout.sm,
          i: "2",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
      ],
      xs: [
        {
          ...input[0]!.layout.xs,
          i: "1",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
        {
          ...input[1]!.layout.xs,
          i: "2",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
      ],
      xss: [
        {
          ...input[0]!.layout.xss,
          i: "1",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
        {
          ...input[1]!.layout.xss,
          i: "2",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
      ],
    };

    // act
    const result = transformLayoutsForGrid(input, makeStatic);

    // assert
    expect(result).toStrictEqual(expected);
  });

  it("transforms correctly into gridlayout with static: false", () => {
    // arrange
    const widgetData1 = new AdjustedWidgetLayout("1", "time", {
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
    });
    const widgetData2 = new AdjustedWidgetLayout("2", "time", {
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
    });

    const input: AdjustedWidgetLayout[] = [widgetData1, widgetData2];
    const makeStatic = false;
    const expected: GridLayout.Layouts = {
      xl: [
        {
          ...input[0]!.layout.xl,
          i: "1",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
        {
          ...input[1]!.layout.xl,
          i: "2",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
      ],
      lg: [
        {
          ...input[0]!.layout.lg,
          i: "1",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
        {
          ...input[1]!.layout.lg,
          i: "2",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
      ],
      md: [
        {
          ...input[0]!.layout.md,
          i: "1",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
        {
          ...input[1]!.layout.md,
          i: "2",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
      ],
      sm: [
        {
          ...input[0]!.layout.sm,
          i: "1",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
        {
          ...input[1]!.layout.sm,
          i: "2",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
      ],
      xs: [
        {
          ...input[0]!.layout.xs,
          i: "1",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
        {
          ...input[1]!.layout.xs,
          i: "2",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
      ],
      xss: [
        {
          ...input[0]!.layout.xss,
          i: "1",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
        {
          ...input[1]!.layout.xss,
          i: "2",
          minW: 2,
          minH: 1,
          static: makeStatic,
        },
      ],
    };

    // act
    const result = transformLayoutsForGrid(input, makeStatic);

    // assert
    expect(result).toStrictEqual(expected);
  });
});
