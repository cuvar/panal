import AppError from "~/lib/error/error";
import { generateUniqueID } from "~/lib/service/widget.service";
import { AdjustedWidgetLayout } from "../adjustedWidgetLayout";
import type { UserWidgetLayout } from "../userWidgetLayout";
import addMissingLayouts from "./addMissingLayoutsService";
import adjustLayoutValues from "./adjustLayoutValuesService";

/**
 * Transforms the given UserWidgetLayout[] into an AdjustedWidgetLayout[]
 * @param {UserWidgetLayout[]} userWidgetLayout UserWidgetLayout[] to transform
 * @returns {AdjustedWidgetLayout[]} AdjustedWidgetLayout[] with unique IDs
 */
export default function transformWidgetLayout(
  userWidgetLayout: UserWidgetLayout[],
): AdjustedWidgetLayout[] {
  try {
    const adjustedWidgetLayout: AdjustedWidgetLayout[] = [];
    for (const widget of userWidgetLayout) {
      const withMissingLayouts = addMissingLayouts(widget.layout);
      const wId = "id" in widget ? (widget.id as string) : generateUniqueID();

      const adjustedConfig = new AdjustedWidgetLayout(
        wId,
        widget.type,
        withMissingLayouts,
      );
      const adjusted = adjustLayoutValues(adjustedConfig);
      adjustedWidgetLayout.push(adjusted);
    }

    return adjustedWidgetLayout;
  } catch (error) {
    throw new AppError("Cannot transform widget config", error);
  }
}
