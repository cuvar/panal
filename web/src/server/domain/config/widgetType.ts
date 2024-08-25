import { z } from "zod";

export type WidgetType = "calendar" | "search" | "links" | "time";

export const WidgetTypeHelper = {
  getSchema() {
    const widgetTypeSchema: z.ZodType<WidgetType> = z.enum([
      "calendar",
      "search",
      "links",
      "time",
    ]);
    return widgetTypeSchema;
  },
  /**
   * Checks whether data is of type WidgetType
   * @param {unknown} type Unkown type to be checked
   * @returns {boolean} Whether data is of type WidgetType
   */
  validate(type: unknown): type is WidgetType {
    return (
      type === "calendar" ||
      type === "search" ||
      type === "links" ||
      type === "time"
    );
  },
};
