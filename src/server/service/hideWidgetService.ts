import findFreeSpace from "~/client/services/findFreeSpaceService";
import AppError from "~/utils/error";
import Log from "~/utils/log";
import type { ScreenSize } from "~/utils/types/types";
import type { HidingInfo, Positioning } from "~/utils/types/widget";
import type { AdjustedWidgetLayout } from "../entities/adjustedWidgetLayout";
import { getLayoutRepository } from "../repository/layout/layoutRepository";
import adjustLayoutValues from "./adjustLayoutValuesService";

/**
 * Updates a widgets layout for a specific screen size, depending on whether it should be hidden or revealed
 * @param {AdjustedWidgetLayout} widget Layout of widget to hide/reveal
 * @param {ScreenSize} screenSize Screensize for which the widget should be hidden/revealed
 * @param {boolean} hide Indicates whether a widget should be hidden or revealed
 * @returns {AdjustedWidgetLayout} The updated widget layout
 */
export default async function hideWidget(
  widget: AdjustedWidgetLayout,
  screenSize: ScreenSize,
  hide: boolean,
) {
  const newLayout: Positioning | HidingInfo = hide
    ? { x: 0, y: 0, w: 0, h: 0 }
    : { x: 0, y: 0, w: 1, h: 1 };

  widget.layout[screenSize] = newLayout;
  const adjusted = adjustLayoutValues(widget as AdjustedWidgetLayout);
  Log(adjusted.layout[screenSize]);

  try {
    if (!hide) {
      const allLayouts = await getLayoutRepository().getAll();
      const currentWidgetsPositionings = allLayouts.map(
        (widget) => widget.layout[screenSize],
      );
      const layoutToInsert = adjusted.layout[screenSize];
      const newSpace = findFreeSpace(
        layoutToInsert,
        currentWidgetsPositionings,
        screenSize,
      );
      adjusted.layout[screenSize] = newSpace;
    }

    await getLayoutRepository().set(widget.id, adjusted);
    return adjusted;
  } catch (error) {
    throw new AppError("Cannot hide widget", error);
  }
}
