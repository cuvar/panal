import { z } from "zod";
import { BREAKPOINTS_ORDER } from "~/lib/basic/const";
import { isObject } from "~/lib/guards/base";
import { ScreenSizeHelper, type ScreenSize } from "../other/screenSize";
import { PositioningHelper, type Positioning } from "./positioning";

export type ScreenSizePositioning = Record<ScreenSize, Positioning>;

export type PartialScreenSizePositioning = {
  [K in ScreenSize]?: Positioning;
};

export const ScreenSizePositioningHelper = {
  getSchema() {
    const positioningSchema = PositioningHelper.getSchema();
    const screenSizePositioningSchema: z.ZodType<ScreenSizePositioning> =
      z.object({
        xl: positioningSchema,
        lg: positioningSchema,
        md: positioningSchema,
        sm: positioningSchema,
        xs: positioningSchema,
        xss: positioningSchema,
      });
    return screenSizePositioningSchema;
  },
  /**
   * Checks whether data is of type ScreenSizePositioning
   * @param {unknown} data Unkown type to be checked
   * @returns {boolean} Whether data is of type ScreenSizePositioning
   */
  validate(data: unknown): data is ScreenSizePositioning {
    if (!isObject(data)) {
      return false;
    }
    if (Object.entries(data).length !== BREAKPOINTS_ORDER.length) {
      // not all screen sizes are present
      return false;
    }

    let foundIssue = false;
    Object.entries(data).forEach(([key, value]) => {
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

export const PartialScreenSizePositioningHelper = {
  getSchema() {
    const positioningSchema = PositioningHelper.getSchema();
    const screenSizePositioningSchema: z.ZodType<ScreenSizePositioning> =
      z.object({
        xl: positioningSchema,
        lg: positioningSchema,
        md: positioningSchema,
        sm: positioningSchema,
        xs: positioningSchema,
        xss: positioningSchema,
      });
    return screenSizePositioningSchema;
  },
  /**
   * Checks whether data is of type PartialScreenSizePositioning
   * @param {unknown} data Unkown type to be checked
   * @returns {boolean} Whether data is of type PartialScreenSizePositioning
   */
  validate(data: unknown): data is PartialScreenSizePositioning {
    if (!isObject(data)) {
      return false;
    }

    let foundIssue = false;
    Object.entries(data).forEach(([key, value]) => {
      if (!ScreenSizeHelper.validate(key)) {
        foundIssue = true;
      }
      if (!PositioningHelper.validate(value) && !foundIssue) {
        foundIssue = false;
      }
    });
    if (foundIssue) return false;
    return true;
  },
};
