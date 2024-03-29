import { isEmptyPositioning } from "~/utils/helper";
import type { ScreenSizePositioning } from "~/utils/types/widget";

/**
 * Returns an array of ScreenSizes in which a widget is hidden
 * @param {ScreenSizePositioning} layout Layout to get hiding classes from
 * @returns {string[]} Array of ScreenSizes in which a widget is hidden
 */
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
