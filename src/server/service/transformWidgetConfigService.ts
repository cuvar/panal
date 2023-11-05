import AppError from "~/utils/error";
import { generateUniqueID } from "~/utils/helper";
import { AdjustedWidgetLayout } from "../entities/adjustedWidgetLayout";
import type { UserWidgetLayout } from "../entities/userWidgetLayout";
import addMissingLayouts from "./addMissingLayoutsService";
import adjustLayoutValues from "./adjustLayoutValuesService";

/**
 * Transforms the given UserWidgetLayout[] into an AdjustedWidgetLayout[]
 * @param {UserWidgetLayout[]} userWidgetLayout UserWidgetLayout[] to transform
 * @returns {AdjustedWidgetLayout[]} AdjustedWidgetLayout[] with unique IDs
 */
export default async function transformWidgetLayout(
  userWidgetLayout: UserWidgetLayout[],
): Promise<AdjustedWidgetLayout[]> {
  try {
    const adjustedWidgetConfig: AdjustedWidgetLayout[] = [];
    for (const widget of userWidgetLayout) {
      const withMissingLayouts = addMissingLayouts(widget.layout);
      const wId = "id" in widget ? (widget.id as string) : generateUniqueID();

      const adjustedConfig = new AdjustedWidgetLayout(wId, withMissingLayouts);
      const widgetType = await adjustedConfig.getType();
      const adjusted = adjustLayoutValues<AdjustedWidgetLayout>(
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
