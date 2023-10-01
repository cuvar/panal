import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { BREAKPOINTS } from "~/utils/const";

import transformLayoutsForGrid from "~/server/service/transformLayoutsService";
import CalendarWidget from "~/server/widgets/calendar/CalendarWidget";
import type { CalendarWidgetData } from "~/server/widgets/calendar/types";
import type { LinkWidgetData } from "~/server/widgets/links/types";
import SearchWidget from "~/server/widgets/search/SearchWidget";
import type { SearchWidgetData } from "~/server/widgets/search/types";
import TimeWidget from "~/server/widgets/time/TimeWidget";
import type { TimeWidgetData } from "~/server/widgets/time/types";
import type { WidgetData } from "~/utils/types/widget";
import LinkCollectionWidget from "../server/widgets/links/LinkWidget/LinkCollectionWidget";

type Props = {
  data: WidgetData[];
};

const ResponsiveGridLayout = WidthProvider(Responsive);
export default function WidgetView(props: Props) {
  return (
    <div className="h-full bg-green-500">
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ ...BREAKPOINTS }}
        cols={{ xl: 10, lg: 10, md: 6, sm: 3, xs: 3, xss: 1 }}
        rowHeight={100}
        layouts={transformLayoutsForGrid(props.data)}
        maxRows={10}
        autoSize={false}
      >
        {props.data.map((widget) => (
          <div
            className="flex items-center justify-center bg-black"
            key={widget.id}
          >
            {widget.type === "time" && (
              <TimeWidget
                data={widget.data as TimeWidgetData}
                layout={widget.layout}
              />
            )}
            {widget.type === "search" && (
              <SearchWidget
                data={widget.data as SearchWidgetData}
                layout={widget.layout}
              />
            )}
            {widget.type === "links" && (
              <LinkCollectionWidget
                data={widget.data as LinkWidgetData}
                layout={widget.layout}
              />
            )}
            {widget.type === "calendar" && (
              <CalendarWidget
                data={widget.data as CalendarWidgetData}
                layout={widget.layout}
              />
            )}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
