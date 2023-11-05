import AppError from "~/utils/error";
import Log from "~/utils/log";
import { ICSFetcher } from "../driver/ICSFetcher";
import { type AdjustedWidgetLayout } from "../entities/adjustedWidgetLayout";
import { type WidgetConfig } from "../entities/widgetConfig";
import { WidgetData } from "../entities/widgetData";
import computeCalendarWidgetData from "../widgets/calendar/data";
import { isCalendarWidgetConfig } from "../widgets/calendar/guards";
import computeLinkWidgetData from "../widgets/links/data";
import { isLinkWidgetConfig } from "../widgets/links/guards";
import computeSearchWidgetData from "../widgets/search/data";
import { isSearchWidgetConfig } from "../widgets/search/guards";
import computeTimeWidgetData from "../widgets/time/data";
import { isTimeWidgetConfig } from "../widgets/time/guards";
import addMissingLayouts from "./addMissingLayoutsService";
import adjustLayoutValues from "./adjustLayoutValuesService";

/**
 * Transforms the given AdjustedWidgetLayout[] into a WidgetData[]
 * @param {WidgetConfig[]} widgetConfig AdjustedWidgetLayout[] to transform
 * @param {AdjustedWidgetLayout[]} layoutConfig
 * @returns {Promise<WidgetData[]>} WidgetData[] with unique IDs
 */
export default async function transformWidgetData(
  widgetConfig: WidgetConfig[],
  layoutConfig: AdjustedWidgetLayout[],
): Promise<WidgetData[]> {
  const widgetData: WidgetData[] = [];
  for (const widget of widgetConfig) {
    let data;

    try {
      if (widget.type === "calendar" && isCalendarWidgetConfig(widget.data)) {
        data = await computeCalendarWidgetData(widget.data, new ICSFetcher());
      } else if (widget.type === "links" && isLinkWidgetConfig(widget.data)) {
        data = computeLinkWidgetData(widget.data);
      } else if (
        widget.type === "search" &&
        isSearchWidgetConfig(widget.data)
      ) {
        data = computeSearchWidgetData(widget.data);
      } else if (widget.type === "time" && isTimeWidgetConfig(widget.data)) {
        data = computeTimeWidgetData(widget.data);
      } else {
        data = {};
      }
    } catch (error) {
      Log(error, "error");
      data = {};
    }

    const layout = layoutConfig.find((l) => l.id === widget.id);
    if (!layout) {
      throw new AppError(
        `Cannot find a layout for widget with id ${widget.id}`,
      );
    }

    try {
      const missingLayouts = addMissingLayouts(layout.layout);
      const newWidget = new WidgetData(
        widget.id,
        widget.type,
        missingLayouts,
        data,
      );

      widgetData.push(
        adjustLayoutValues<WidgetData>(newWidget, newWidget.type),
      );
    } catch (error) {
      throw new AppError("Cannot transform widget config", error);
    }
  }
  return widgetData;
}
