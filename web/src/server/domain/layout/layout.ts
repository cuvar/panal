import { isObject } from "~/lib/guards/base";
import { ScreenSizeHelper } from "../other/screenSize";
import { PositioningHelper, type Positioning } from "./positioning";
import { type PartialScreenSizePositioning } from "./screensizePositioning";

export type Layout = Positioning | PartialScreenSizePositioning;
export type RGLayout = ReactGridLayout.Layouts;

export const LayoutHelper = {
  /**
   * Checks whether data is of type Layout
   * @param {unknown} layout Unkown type to be checked
   * @returns {boolean} Whether data is of type Layout
   */
  validate(layout: unknown): layout is Layout {
    if (!isObject(layout)) {
      return false;
    }

    if (PositioningHelper.validate(layout)) {
      return true;
    }

    let foundIssue = false;
    Object.entries(layout).forEach(([key, value]) => {
      if (!ScreenSizeHelper.validate(key)) {
        foundIssue = true;
      }
      if (!PositioningHelper.validate(value)) {
        foundIssue = true;
      }
    });
    if (foundIssue) return false;
    return true;
  },
};
