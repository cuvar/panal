/**
 * @jest-environment node
 */

import findFreeSpace from "./findFreeSpaceService";

describe("findFreeSpaceService", () => {
  it("returns the original widget position when there is no free space", () => {
    const widget = { x: 0, y: 0, w: 1, h: 1 };
    const allWidgets = [{ x: 0, y: 0, w: 10, h: 10 }];
    const screenSize = "lg";

    const result = findFreeSpace(widget, allWidgets, screenSize);

    expect(result).toEqual(widget);
  });

  it("returns a new position when there is free space", () => {
    const widget = { x: 0, y: 0, w: 1, h: 1 };
    const allWidgets = [{ x: 1, y: 1, w: 1, h: 1 }];
    const screenSize = "lg";

    const result = findFreeSpace(widget, allWidgets, screenSize);

    expect(result).toEqual({ ...widget, x: 0, y: 0 });
  });

  it("returns a new position when there is free space, considering the screen size", () => {
    const widget = { x: 0, y: 0, w: 1, h: 1 };
    const allWidgets = [{ x: 0, y: 0, w: 1, h: 1 }];
    const screenSize = "sm";

    const result = findFreeSpace(widget, allWidgets, screenSize);

    expect(result).toEqual({ ...widget, x: 1, y: 0 });
  });
});
