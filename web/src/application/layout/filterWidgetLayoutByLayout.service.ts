import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { type RGLayout } from "~/server/domain/layout/layout";
import { type ScreenSize } from "~/server/domain/other/screenSize";

/**
 * filters out all elements in awLayout that are not in rgLayout - by id
 * @param {AdjustedWidgetLayout[]} awLayout Adjusted widget layout
 * @param {RGLayout} rgLayout React grid layout
 * @param {ScreenSize} currentScreenSize Current screen size
 * @returns {AdjustedWidgetLayout[]} Filteres AdjustedWidgetLayout
 */
export default function filterWidgetLayoutByRgl(
  awLayout: AdjustedWidgetLayout[],
  rgLayout: RGLayout,
  currentScreenSize: ScreenSize,
): AdjustedWidgetLayout[] {
  let filteredAWLayout: AdjustedWidgetLayout[] = [];

  const layout = rgLayout[currentScreenSize];
  if (!layout) {
    return [];
  }

  filteredAWLayout = awLayout.filter((widget) =>
    layout.some((l) => l.i === widget.id),
  );

  return filteredAWLayout;
}
