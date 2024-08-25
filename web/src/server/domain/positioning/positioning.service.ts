import { type Positioning } from "./positioning";

/**
 * Checks whether input is of type empty Positioning
 * @param {Positioning} positioning Unkown type to be checked
 * @returns {boolean} Whether data is of type Layout
 */
export function isEmptyPositioning(positioning: Positioning): boolean {
  return (
    positioning.h === 0 &&
    positioning.w === 0 &&
    positioning.x === 0 &&
    positioning.y === 0
  );
}

/**
 * Check if two widgets overlap
 * @param {Positioning} w1 The first widget
 * @param w2
 * @returns {boolean} True if the widgets overlap, false otherwise
 */
export function overlaps(w1: Positioning, w2: Positioning): boolean {
  return !(
    w2.x >= w1.x + w1.w ||
    w2.x + w2.w <= w1.x ||
    w2.y >= w1.y + w1.h ||
    w2.y + w2.h <= w1.y
  );
}
