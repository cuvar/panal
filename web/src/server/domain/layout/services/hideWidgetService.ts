import { calcNewWidgetLayout } from "~/client/services/calcNewWidgetLayoutService";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import type { AdjustedWidgetLayout } from "../adjustedWidgetLayout";
import { getLayoutRepository } from "../repo/layoutRepository";
import { type WidgetVisibility } from "../widgetVisibility";

/**
 * Updates a widgets layout for a specific screen size, depending on whether it should be hidden or revealed
 * @param {WidgetVisibility[]} widgetVisibility WidgetVisibility of widgets that should be hidden/revealed
 * @returns {AdjustedWidgetLayout[]} The updated widget layout
 */
export async function hideWidgets(widgetVisibility: WidgetVisibility[]) {
  try {
    const allLayouts = await getLayoutRepository().getAll();
    const newLayouts = widgetVisibility.map((wi) =>
      calcNewWidgetLayout(wi, allLayouts),
    );
    await getLayoutRepository().setMany(newLayouts);
    return newLayouts;
  } catch (error) {
    throw new AppError(codes.SERVICE_HIDE_FAILED, error);
  }
}
