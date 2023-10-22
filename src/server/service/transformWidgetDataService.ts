import AppError from "~/utils/error";
import Log from "~/utils/log";
import { ICSFetcher } from "../driver/ICSFetcher";
import type { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
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
 * Transforms the given AdjustedWidgetConfig[] into a WidgetData[]
 * @param {AdjustedWidgetConfig[]} widgetConfig AdjustedWidgetConfig[] to transform
 * @returns {Promise<WidgetData[]>} WidgetData[] with unique IDs
 */
export default async function transformWidgetData(
  widgetConfig: AdjustedWidgetConfig[],
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

    try {
      const missingLayouts = addMissingLayouts(widget.layout);
      const newWidget = new WidgetData(
        widget.id,
        widget.type,
        missingLayouts,
        data,
      );

      widgetData.push(adjustLayoutValues<WidgetData>(newWidget));
    } catch (error) {
      throw new AppError("Cannot transform widget config", error);
    }
  }
  return widgetData;
}
