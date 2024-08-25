import { type WidgetType } from "~/lib/types/widget";
import { type WidgetData } from "~/server/domain/config/widgetData";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { type CalendarWidgetData } from "~/server/widgets/calendar/types";
import CalendarWidget from "~/server/widgets/calendar/widget";
import { type LinkWidgetData } from "~/server/widgets/links/types";
import LinkCollectionWidget from "~/server/widgets/links/widget";
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
): React.ReactNode {
  const widgets: Record<WidgetType, React.ReactNode> = {
    time: <TimeWidget widget={widget} data={data.data as TimeWidgetData} />,
    search: (
      <SearchWidget widget={widget} data={data.data as SearchWidgetData} />
    ),
    links: (
      <LinkCollectionWidget
        widget={widget}
        data={data.data as LinkWidgetData}
      />
    ),
    calendar: (
      <CalendarWidget widget={widget} data={data.data as CalendarWidgetData} />
    ),
  };

  return widgets[widget.type] ?? <></>;
}
