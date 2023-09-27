import type { WidgetData } from "~/utils/types/widget";
import { getWidgetsConfig } from "../repository/widgetRepository";
import { isCalendarWidgetConfig } from "../widgets/calendar/guards";
import { isLinkWidgetConfig } from "../widgets/links/guards";
import { isSearchWidgetConfig } from "../widgets/search/guards";
import { isTimeWidgetConfig } from "../widgets/time/guards";
import computeCalendarWidgetData from "../widgets/calendar/data";
import computeLinkWidgetData from "../widgets/links/data";
import computeSearchWidgetData from "../widgets/search/data";
import computeTimeWidgetData from "../widgets/time/data";

export default async function getWidgetData(): Promise<WidgetData[]> {
  const widgetsConfig = await getWidgetsConfig();
  const widgetData: WidgetData[] = [];
  for (const widget of widgetsConfig) {
    let data;

    if (widget.type === "calendar" && isCalendarWidgetConfig(widget.data)) {
      data = await computeCalendarWidgetData(widget.data);
    } else if (widget.type === "links" && isLinkWidgetConfig(widget.data)) {
      data = computeLinkWidgetData(widget.data);
    } else if (widget.type === "search" && isSearchWidgetConfig(widget.data)) {
      data = computeSearchWidgetData(widget.data);
    } else if (widget.type === "time" && isTimeWidgetConfig(widget.data)) {
      data = computeTimeWidgetData(widget.data);
    } else {
      data = {};
    }

    widgetData.push({
      ...widget,
      data: data,
    });
  }

  return widgetData;
}
