import { createId } from "@paralleldrive/cuid2";
import type { Positioning } from "./types/widget";

export function generateUniqueID(): string {
  return createId();
}

export function isSameSet(arr1: readonly unknown[], arr2: readonly unknown[]) {
  return arr1.every((item) => arr2.includes(item));
}

export function isEmptyPositioning(positioning: Positioning): boolean {
  return (
    positioning.h === 0 &&
    positioning.w === 0 &&
    positioning.x === 0 &&
    positioning.y === 0
  );
}
