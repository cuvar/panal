import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import { BREAKPOINTS } from "~/utils/const";

import SearchWidget from "~/server/widgets/search/SearchWidget";
import TimeWidget from "~/server/widgets/time/TimeWidget";
import CalendarWidget from "~/server/widgets/calendar/CalendarWidget";
import LinkCollectionWidget from "../server/widgets/links/LinkWidget/LinkCollectionWidget";
import type { CalendarWidgetData } from "~/server/widgets/calendar/types";
import type { SearchWidgetData } from "~/server/widgets/search/types";
import type { WidgetData } from "~/utils/types/widget";
import type { TimeWidgetData } from "~/server/widgets/time/types";
import type { LinkWidgetData } from "~/server/widgets/links/types";
import transformLayoutsForGrid from "~/server/service/transformLayoutsService";

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
            key={widget.type}
          >
            {widget.type === "time" && (
              <TimeWidget {...(widget.data as TimeWidgetData)} />
            )}
            {widget.type === "search" && (
              <SearchWidget {...(widget.data as SearchWidgetData)} />
            )}
            {widget.type === "links" && (
              <LinkCollectionWidget
                colCount={4}
                rowCount={1}
                {...(widget.data as LinkWidgetData)}
              />
            )}
            {widget.type === "calendar" && (
              <CalendarWidget {...(widget.data as CalendarWidgetData)} /> // todo: not quite working
            )}
          </div>
        ))}
        {/* <div className="flex items-center justify-center bg-black" key="time">
          <TimeWidget />
        </div>
        <div className="flex items-center justify-center bg-black" key="search">
          <SearchWidget />
        </div>
        <div className="flex items-center justify-center bg-black" key="link">
          <LinkCollectionWidget colCount={4} rowCount={1} />
        </div>
        <div className="flex items-center justify-center bg-black" key="cal">
          <CalendarWidget calendarData={props.data.calendarData} />
        </div> */}
      </ResponsiveGridLayout>
    </div>
  );
}
