import addMissingLayouts from "~/application/client/addMissingLayouts.service";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import { generateUniqueID } from "~/lib/service/widget.service";
import { type AdjustedWidgetLayout } from "../adjustedWidgetLayout";
import type { UserWidgetLayout } from "../userWidgetLayout";
import adjustLayoutValues from "./adjustLayoutValues.service";

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

      const adjustedConfig = {
        id: wId,
        type: widget.type,
        layout: withMissingLayouts,
      } as AdjustedWidgetLayout;
      const adjusted = adjustLayoutValues(adjustedConfig);
      adjustedWidgetLayout.push(adjusted);
    }

    return adjustedWidgetLayout;
  } catch (error) {
    throw new AppError(codes.SERVICE_TRANSFORM_CONFIG_FAILED, error);
  }
}
