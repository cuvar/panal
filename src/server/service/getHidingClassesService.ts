import type { Positioning, ScreenSizePositioning } from "~/utils/types/widget";

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

function isEmptyPositioning(positioning: Positioning): boolean {
  return (
    positioning.h === 0 &&
    positioning.w === 0 &&
    positioning.x === 0 &&
    positioning.y === 0
  );
}
