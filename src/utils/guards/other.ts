import type { ScreenSize } from "../types/types";

/**
 * Checks whether data is of type ScreenSize
 * @param {unknown} screenSize Unkown type to be checked
 * @returns {boolean} Whether data is of type ScreenSize
 */
export function isScreenSize(screenSize: unknown): screenSize is ScreenSize {
  return (
    screenSize === "xss" ||
    screenSize === "xs" ||
    screenSize === "sm" ||
    screenSize === "md" ||
    screenSize === "lg" ||
    screenSize === "xl"
  );
}
