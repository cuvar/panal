import { generateUniqueID } from "~/utils/helper";
import type { WidgetData } from "~/utils/types/widget";
import { getWidgetsConfig } from "../repository/widgetRepository";
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

// todo: write tests
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

    const newLayout = addMissingLayouts(widget.layout);

    const newWidget = {
      ...widget,
      layout: newLayout,
      id: generateUniqueID(),
      data: data,
    };

    widgetData.push(adjustLayoutValues<WidgetData>(newWidget));
  }

  return widgetData;
}
