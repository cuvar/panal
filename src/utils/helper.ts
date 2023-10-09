import { createId } from "@paralleldrive/cuid2";
import type { Positioning } from "./types/widget";

/**
 * Checks whether input is of type empty Positioning
 * @returns {string} Whether data is of type Layout
 */
export function generateUniqueID(): string {
  return createId();
}

/**
 * Checks whether two arrays contain the same elements
 * @param {unknown[]} arr1 First array
 * @param {unknown[]} arr2 Second array
 * @returns {boolean} Whether both arrays contain the same elements
 */
export function isSameSet(arr1: readonly unknown[], arr2: readonly unknown[]) {
  return arr1.every((item) => arr2.includes(item));
}

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
