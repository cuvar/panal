import { type WidgetData } from "~/server/domain/config/widgetData";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { type CalendarWidgetData } from "~/server/widgets/calendar/types";
import CalendarWidget from "~/server/widgets/calendar/widget";
import LinkCollectionWidget from "~/server/widgets/links/LinkCollectionWidget";
import { type LinkWidgetData } from "~/server/widgets/links/types";
import { type SearchWidgetData } from "~/server/widgets/search/types";
import SearchWidget from "~/server/widgets/search/widget";
import { type TimeWidgetData } from "~/server/widgets/time/types";
import TimeWidget from "~/server/widgets/time/widget";

/**
 * Turns Layout and WidgetData data into an actual widget component
 * @param {AdjustedWidgetLayout} widget Layout info for widget
 * @param {WidgetData} data WidgetData needed for component
 * @returns {JSX.Element} Actual widget component
 */
export default function mapWidgets(
  widget: AdjustedWidgetLayout,
  data: WidgetData,
): JSX.Element {
  if (widget.type === "time") {
    return <TimeWidget widget={widget} data={data.data as TimeWidgetData} />;
  }

  if (widget.type === "search") {
    return (
      <SearchWidget widget={widget} data={data.data as SearchWidgetData} />
    );
  }
  if (widget.type === "links") {
    return (
      <LinkCollectionWidget
        widget={widget}
        data={data.data as LinkWidgetData}
      />
    );
  }
  if (widget.type === "calendar") {
    return (
      <CalendarWidget widget={widget} data={data.data as CalendarWidgetData} />
    );
  }
  return <></>;
}
