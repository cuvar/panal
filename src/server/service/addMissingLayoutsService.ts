import { BREAKPOINTS_ORDER } from "~/utils/const";
import {
  isPartialScreenSizePositioning,
  isScreenSizePositioning,
} from "~/utils/guards/widgets";
import type { ScreenSize } from "~/utils/types/types";
import type { Layout, ScreenSizePositioning } from "~/utils/types/widget";

export default function addMissingLayouts(
  layout: Layout,
): ScreenSizePositioning {
  if (isScreenSizePositioning(layout)) {
    return layout;
  } else if (isPartialScreenSizePositioning(layout)) {
    const exisitingScreenSizes = Object.keys(layout) as ScreenSize[];
    const missingScreenSizes = BREAKPOINTS_ORDER.filter(
      (screenSize) => !exisitingScreenSizes.includes(screenSize),
    );
    const missingLayouts = missingScreenSizes.map((mss) => {
      const replacementScreen = getReplacementScreenSize(
        exisitingScreenSizes,
        mss,
      );
      const replacementLayout = layout[replacementScreen];
      if (replacementLayout == undefined) {
        throw new Error("No replacement layout found");
      }

      return {
        screen: mss,
        layout: replacementLayout,
      };
    });

    // merge
    const newLayout = layout;
    missingLayouts.forEach((ml) => {
      newLayout[ml.screen] = ml.layout;
    });

    return newLayout as ScreenSizePositioning;
  }

  // is Positioning
  return {
    xl: layout,
    lg: layout,
    md: layout,
    sm: layout,
    xs: layout,
    xss: layout,
  };
}

export function getReplacementScreenSize(
  defined: ScreenSize[],
  missing: ScreenSize,
): ScreenSize {
  const index = BREAKPOINTS_ORDER.indexOf(missing);
  for (let i = index; i < BREAKPOINTS_ORDER.length; i++) {
    const above = BREAKPOINTS_ORDER[i + 1];
    if (above === undefined) {
      break;
    }
    if (defined.includes(above)) {
      return above;
    }
  }

  for (let i = index; i > 0; i--) {
    const below = BREAKPOINTS_ORDER[i - 1];
    if (below === undefined) {
      break;
    }
    if (defined.includes(below)) {
      return below;
    }
  }

  throw new Error("No replacement screen size found");
}
