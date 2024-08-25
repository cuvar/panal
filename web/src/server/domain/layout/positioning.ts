import { z } from "zod";
import { isNumber, isObject } from "~/lib/guards/base";

export type Positioning = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export const PositioningHelper = {
  getSchema() {
    const positioningSchema: z.ZodType<Positioning> = z.object({
      x: z.number(),
      y: z.number(),
      w: z.number(),
      h: z.number(),
    });
    return positioningSchema;
  },
  /**
   * Checks whether data is of type Positioning
   * @param {unknown} positioning Unkown type to be checked
   * @returns {boolean} Whether data is of type Positioning
   */
  validate(positioning: unknown): positioning is Positioning {
    if (!isObject(positioning)) {
      return false;
    }
    if (!isNumber(positioning.x)) {
      return false;
    }
    if (!isNumber(positioning.y)) {
      return false;
    }
    if (!isNumber(positioning.w)) {
      return false;
    }
    if (!isNumber(positioning.h)) {
      return false;
    }
    return true;
  },
};
