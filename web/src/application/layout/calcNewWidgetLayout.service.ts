import { HIDDEN_POSITIONING } from "~/lib/basic/const";
import Log from "~/lib/log/log";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { type WidgetVisibility } from "~/server/domain/layout/widgetVisibility";
import { type Positioning } from "~/server/domain/positioning/positioning";
import adjustLayoutValues from "./adjustLayoutValues.service";
import findFreeSpace from "./findFreeSpace.service";

/**
 * Updates a widgets layout for a specific screen size, depending on whether it should be hidden or revealed
 * @param {WidgetVisibility} widgetVisibility HideInfo of widgets that should be hidden/revealed
 * @param {Positioning[]} currentWidgetsPositionings The positionings of all widgets
 * @returns {AdjustedWidgetLayout} The updated widget layout
 */
export function calcNewWidgetLayout(
  widgetVisibility: WidgetVisibility,
  currentWidgetsPositionings: Positioning[],
): AdjustedWidgetLayout {
  const screen = widgetVisibility.screenSize;
  const visible = widgetVisibility.visible;
  const oldWidget = widgetVisibility.widget;

  // ! has this any effect?
  const newLayout: Positioning = !visible
    ? HIDDEN_POSITIONING
    : { x: 0, y: 0, w: 1, h: 1 };

  oldWidget.layout[screen] = newLayout;
  const adjustedWidgetLayout = adjustLayoutValues(
    oldWidget as AdjustedWidgetLayout,
  );
  Log("getNewLayout", "log", adjustedWidgetLayout.layout[screen]);

  if (!visible) {
    return adjustedWidgetLayout;
  }

  const layoutToInsert = adjustedWidgetLayout.layout[screen];
  const newSpace = findFreeSpace(
    layoutToInsert,
    currentWidgetsPositionings,
    screen,
  );
  adjustedWidgetLayout.layout[screen] = newSpace;
  return adjustedWidgetLayout;
}
