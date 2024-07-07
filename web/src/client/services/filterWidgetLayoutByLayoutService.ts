import { type RGLayout, type ScreenSize } from "~/lib/types/types";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";

/**
 * filters out all elements in awLayout tha are not in rgLayout - by id
 * @param {AdjustedWidgetLayout[]} awLayout Adjusted widget layout
 * @param {RGLayout} rgLayout React grid layout
 * @param {ScreenSize} currentScreenSize Current screen size
 * @returns {AdjustedWidgetLayout[]} Filteres AdjustedWidgetLayout
 */
export default function filterWidgetLayoutByLayout(
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
