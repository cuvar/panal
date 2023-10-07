import { isEmptyPositioning } from "~/utils/helper";
import type { ScreenSizePositioning } from "~/utils/types/widget";

export default function getHidingClasses(
  layout: ScreenSizePositioning,
): string[] {
  const hidingClasses: string[] = [];
  Object.entries(layout).forEach(([key, value]) => {
    if (isEmptyPositioning(value)) {
      if (key == "xss") {
        hidingClasses.push(key);
        return;
      }
      hidingClasses.push(`${key}`);
    }
  });
  return hidingClasses;
}
