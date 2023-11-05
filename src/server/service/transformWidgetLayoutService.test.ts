/**
 * @jest-environment node
 */

import { AdjustedWidgetLayout } from "../entities/adjustedWidgetLayout";
import { UserWidgetLayout } from "../entities/userWidgetLayout";
import transformWidgetLayout from "./transformWidgetLayoutService";

describe("transformWidgetLayoutService", () => {
  it("works correctly", async () => {
    // arrange
    const layoutInput = {
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
    };

    const layoutExpected = {
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

    const input = new UserWidgetLayout(layoutInput);
    const expected = new AdjustedWidgetLayout("1", layoutExpected);

    // act
    const action = async () => {
      const res = await transformWidgetLayout([input]);
      return res[0]!;
    };

    // assert
    await expect(typeof (await action()).id).resolves.toBe("string");
    await expect((await action()).layout).resolves.toBe(expected.layout);
  });
});
