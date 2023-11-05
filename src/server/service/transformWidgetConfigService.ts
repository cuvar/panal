import Log from "~/utils/log";
import { ICSFetcher } from "../driver/Fetcher/ICSFetcher";
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

/**
 * Transforms the given WidgetConfig[] into a WidgetData[]
 * @param {WidgetConfig[]} widgetConfig AdjustedWidgetLayout[] to transform
 * @returns {Promise<WidgetData[]>} WidgetData[] with unique IDs
 */
export default async function transformWidgetConfig(
  widgetConfig: WidgetConfig[],
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

    widgetData.push(new WidgetData(widget.id, widget.type, data));
  }
  return widgetData;
}
