import { createId } from "@paralleldrive/cuid2";

export function generateUniqueID(): string {
  return createId();
}
