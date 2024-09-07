import { type ScreenSize } from "~/server/domain/other/screenSize";
import { BREAKPOINTS } from "../basic/const";

/**
 * Get the screen size based on the width of the screen
 * @param width Width of the screen
 * @returns {ScreenSize} The screen size
 */
export function getScreenSize(width: number): ScreenSize {
  const size = Object.entries(BREAKPOINTS).findLast(([_key, value]) => {
    return width! >= value;
  })?.[0] as ScreenSize;
  return size;
}
