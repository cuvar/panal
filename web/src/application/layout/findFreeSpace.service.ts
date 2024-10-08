import { BREAKPOINT_COLS, GRID_MAX_ROW } from "~/lib/basic/const";
import { type ScreenSize } from "~/server/domain/other/screenSize";
import { type Positioning } from "~/server/domain/positioning/positioning";
import { overlaps } from "~/server/domain/positioning/positioning.service";

/**
 * Finds a free space for a widget to position it
 * @param {Positioning} widget Widget for which to find free space
 * @param {Positioning[]} allWidgets All currently occupied cells
 * @param {ScreenSize} screenSize The current screen size
 * @returns {Positioning} The position of the widget or false if no free space was found
 */
export default function findFreeSpace(
  widget: Positioning,
  allWidgets: Positioning[],
  screenSize: ScreenSize,
) {
  for (let y = 0; y <= GRID_MAX_ROW - widget.h; y++) {
    for (let x = 0; x <= BREAKPOINT_COLS[screenSize] - widget.w; x++) {
      const potentialPosition = { ...widget, x, y };
      if (allWidgets.every((w) => !overlaps(w, potentialPosition))) {
        return potentialPosition;
      }
    }
  }
  return widget;
}
