import { z } from "zod";

export type ScreenSize = "xss" | "xs" | "sm" | "md" | "lg" | "xl";

export const ScreenSizeHelper = {
  getSchema() {
    const screenSizeSchema: z.ZodType<ScreenSize> = z.enum([
      "xl",
      "lg",
      "md",
      "sm",
      "xs",
      "xss",
    ]);
    return screenSizeSchema;
  },
  validate(screenSize: unknown): screenSize is ScreenSize {
    return (
      screenSize === "xss" ||
      screenSize === "xs" ||
      screenSize === "sm" ||
      screenSize === "md" ||
      screenSize === "lg" ||
      screenSize === "xl"
    );
  },
};
