import AppError from "~/utils/error";
import { generateUniqueID } from "~/utils/helper";
import { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
import type { UserWidgetLayout } from "../entities/userWidgetConfig";
import addMissingLayouts from "./addMissingLayoutsService";
import adjustLayoutValues from "./adjustLayoutValuesService";

/**
 * Transforms the given UserWidgetLayout[] into an AdjustedWidgetConfig[]
 * @param {UserWidgetLayout[]} userWidgetConfig UserWidgetLayout[] to transform
 * @returns {AdjustedWidgetConfig[]} AdjustedWidgetConfig[] with unique IDs
 */
export default async function transformWidgetLayout(
  userWidgetConfig: UserWidgetLayout[],
): Promise<AdjustedWidgetConfig[]> {
  try {
    const adjustedWidgetConfig: AdjustedWidgetConfig[] = [];
    for (const widget of userWidgetConfig) {
      const withMissingLayouts = addMissingLayouts(widget.layout);
      const wId = "id" in widget ? (widget.id as string) : generateUniqueID();

      const adjustedConfig = new AdjustedWidgetConfig(wId, withMissingLayouts);
      const widgetType = await adjustedConfig.getType();
      const adjusted = adjustLayoutValues<AdjustedWidgetConfig>(
        adjustedConfig,
        widgetType,
      );
      adjustedWidgetConfig.push(adjusted);
    }

    return adjustedWidgetConfig;
  } catch (error) {
    throw new AppError("Cannot transform widget config", error);
  }
}
