import Log from "~/utils/log";
import { ICSFetcher } from "../driver/ICSFetcher";
import { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
import { type WidgetConfig } from "../entities/widgetConfig";
import computeCalendarWidgetData from "../widgets/calendar/data";
import { isCalendarWidgetConfig } from "../widgets/calendar/guards";
import computeLinkWidgetData from "../widgets/links/data";
import { isLinkWidgetConfig } from "../widgets/links/guards";
import computeSearchWidgetData from "../widgets/search/data";
import { isSearchWidgetConfig } from "../widgets/search/guards";
import computeTimeWidgetData from "../widgets/time/data";
import { isTimeWidgetConfig } from "../widgets/time/guards";

/**
 * Transforms the given WidgetConfig[] into a AdjustedWidgetConfig[]
 * @param {WidgetConfig[]} widgetConfig AdjustedWidgetLayout[] to transform
 * @returns {Promise<AdjustedWidgetConfig[]>} AdjustedWidgetConfig[] with unique IDs
 */
export default async function transformWidgetData(
  widgetConfig: WidgetConfig[],
): Promise<AdjustedWidgetConfig[]> {
  const adjustedWidgetConfig: AdjustedWidgetConfig[] = [];
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

    adjustedWidgetConfig.push(
      new AdjustedWidgetConfig(widget.id, widget.type, data),
    );
  }
  return adjustedWidgetConfig;
}

// const layout = layoutConfig.find((l) => l.id === widget.id);
// if (!layout) {
//   throw new AppError(
//     `Cannot find a layout for widget with id ${widget.id}`,
//   );
// }

// try {
//   const missingLayouts = addMissingLayouts(layout.layout);
//   const newWidget = new WidgetData(
//     widget.id,
//     widget.type,
//     missingLayouts,
//     data,
//   );

//   widgetData.push(
//     adjustLayoutValues<WidgetData>(newWidget, newWidget.type),
//   );
// } catch (error) {
//   throw new AppError("Cannot transform widget config", error);
// }
