import { BREAKPOINTS_ORDER, HIDDEN_POSITIONING } from "~/lib/basic/const";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import { type Layout } from "~/server/domain/layout/layout";
import {
  PartialScreenSizePositioningHelper,
  ScreenSizePositioningHelper,
  type ScreenSizePositioning,
} from "~/server/domain/layout/screensizePositioning";
import { type ScreenSize } from "~/server/domain/other/screenSize";

/**
 * Adds layouts for missing ScreenSizes to the given layout
 * @param {Layout} layout Given layout
 * @param {boolean} withReplacement Indicates whether an (existing) replacement layout should be used. Otherwise it stays hidden for other missing screens
 * @returns {ScreenSizePositioning} layout with all ScreenSizes
 */
export default function addMissingLayouts(
  layout: Layout,
  withReplacement = true,
): ScreenSizePositioning {
  if (ScreenSizePositioningHelper.validate(layout)) {
    return layout;
  } else if (PartialScreenSizePositioningHelper.validate(layout)) {
    const exisitingScreenSizes = Object.keys(layout) as ScreenSize[];
    const missingScreenSizes = BREAKPOINTS_ORDER.filter(
      (screenSize) => !exisitingScreenSizes.includes(screenSize),
    );
    try {
      const missingLayouts = missingScreenSizes.map((mss) => {
        let replacementLayout = undefined;
        if (withReplacement) {
          const replacementScreen = getReplacementScreenSize(
            exisitingScreenSizes,
            mss,
          );
          replacementLayout = layout[replacementScreen];
        } else {
          replacementLayout = HIDDEN_POSITIONING;
        }
        if (replacementLayout == undefined) {
          throw new AppError(codes.SERVICE_REPLACEMENT_SCREEN_FAILED);
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
    } catch (error) {
      throw new AppError(codes.SERVICE_ADD_MISSING_LAYOUT_FAILED, error);
    }
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

/**
 * Returns the ScreenSize that can be used as a replacement for the missing ScreenSize
 * @param {ScreenSize[]} defined ScreenSizes that are defined
 * @param {ScreenSize} missing ScreenSize that is missing
 * @returns {ScreenSize} Replacement ScreenSize
 */
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

  throw new AppError(codes.SERVICE_REPLACEMENT_SCREEN_FAILED);
}
