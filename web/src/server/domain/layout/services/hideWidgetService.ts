import findFreeSpace from "~/client/services/findFreeSpaceService";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import Log from "~/lib/log/log";
import type { Positioning } from "~/lib/types/widget";
import type { AdjustedWidgetLayout } from "../adjustedWidgetLayout";
import { type HideInfo } from "../hideInfo";
import { getLayoutRepository } from "../repo/layoutRepository";
import adjustLayoutValues from "./adjustLayoutValuesService";

/**
 * Updates a widgets layout for a specific screen size, depending on whether it should be hidden or revealed
 * @param {HideInfo[]} hideInfo HideInfo of widgets that should be hidden/revealed
 * @param widgets
 * @returns {AdjustedWidgetLayout[]} The updated widget layout
 */
export async function hideWidgets(hideInfo: HideInfo[]) {
  try {
    const allLayouts = await getLayoutRepository().getAll();
    const newLayouts = hideInfo.map((hi) => getNewLayout(hi, allLayouts));
    await getLayoutRepository().setMany(newLayouts);
    return newLayouts;
  } catch (error) {
    throw new AppError(codes.SERVICE_HIDE_FAILED, error);
  }
}

/**
 *  Updates a widgets layout for a specific screen size, depending on whether it should be hidden or revealed
 * @param {HideInfo} widget HideInfo of widgets that should be hidden/revealed
 * @param {AdjustedWidgetLayout[]} allLayouts All layouts of widgets
 * @returns {AdjustedWidgetLayout} The updated widget layout
 */
function getNewLayout(
  widget: HideInfo,
  allLayouts: AdjustedWidgetLayout[],
): AdjustedWidgetLayout {
  const screen = widget.screenSize;
  const hide = widget.hide;
  const oldWidget = widget.widget;

  const newLayout: Positioning = widget.hide
    ? { x: 0, y: 0, w: 0, h: 0 }
    : { x: 0, y: 0, w: 1, h: 1 };

  oldWidget.layout[screen] = newLayout;
  const adjusted = adjustLayoutValues(oldWidget as AdjustedWidgetLayout);
  Log(adjusted.layout[screen]);

  if (!hide) {
    const currentWidgetsPositionings = allLayouts.map(
      (widget) => widget.layout[screen],
    );
    const layoutToInsert = adjusted.layout[screen];
    const newSpace = findFreeSpace(
      layoutToInsert,
      currentWidgetsPositionings,
      screen,
    );
    adjusted.layout[screen] = newSpace;
  }
  return adjusted;
}
