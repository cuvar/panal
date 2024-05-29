import Log from "~/lib/log/log";
import { ICSFetcher } from "../../../driver/Fetcher/ICSFetcher";
import computeDataCalendarWidget from "../../../widgets/calendar/data";
import { isCalendarWidgetConfig } from "../../../widgets/calendar/guards";
import computeDataLinkWidget from "../../../widgets/links/data";
import { isLinkWidgetConfig } from "../../../widgets/links/guards";
import computeDataSearchWidget from "../../../widgets/search/data";
import { isSearchWidgetConfig } from "../../../widgets/search/guards";
import computeDataTimeWidget from "../../../widgets/time/data";
import { isTimeWidgetConfig } from "../../../widgets/time/guards";
import { type WidgetConfig } from "../widgetConfig";
import { WidgetData } from "../widgetData";

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
        data = await computeDataCalendarWidget(widget.data, new ICSFetcher());
      } else if (widget.type === "links" && isLinkWidgetConfig(widget.data)) {
        data = computeDataLinkWidget(widget.data);
      } else if (
        widget.type === "search" &&
        isSearchWidgetConfig(widget.data)
      ) {
        data = computeDataSearchWidget(widget.data);
      } else if (widget.type === "time" && isTimeWidgetConfig(widget.data)) {
        data = computeDataTimeWidget(widget.data);
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
