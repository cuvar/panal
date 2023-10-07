import { createId } from "@paralleldrive/cuid2";

export function generateUniqueID(): string {
  return createId();
}

export function isSameSet(arr1: readonly unknown[], arr2: readonly unknown[]) {
  return arr1.every((item) => arr2.includes(item));
}
