import AppError from "~/utils/error";
import { generateUniqueID } from "~/utils/helper";
import { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
import type { UserWidgetConfig } from "../entities/userWidgetConfig";
import addMissingLayouts from "./addMissingLayoutsService";
import adjustLayoutValues from "./adjustLayoutValuesService";

/**
 * Transforms the given UserWidgetConfig[] into an AdjustedWidgetConfig[]
 * @param {UserWidgetConfig[]} userWidgetConfig UserWidgetConfig[] to transform
 * @returns {AdjustedWidgetConfig[]} AdjustedWidgetConfig[] with unique IDs
 */
export default function transformWidgetConfig(
  userWidgetConfig: UserWidgetConfig[],
) {
  try {
    const adjustedWidgetConfig = userWidgetConfig.map((widget) => {
      const withMissingLayouts = addMissingLayouts(widget.layout);
      const adjustedConfig = new AdjustedWidgetConfig(
        generateUniqueID(),
        widget.type,
        withMissingLayouts,
        widget.data,
      );
      return adjustLayoutValues<AdjustedWidgetConfig>(adjustedConfig);
    });

    return adjustedWidgetConfig;
  } catch (error) {
    throw new AppError("Cannot transform widget config", error);
  }
}
