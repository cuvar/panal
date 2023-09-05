import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import { getLayouts } from "~/utils/grid";
import { BREAKPOINTS } from "~/utils/const";

import SearchWidget from "~/widgets/SearchWidget";
import TimeWidget from "~/widgets/TimeWidget";
import CalendarWidget from "~/widgets/CalendarWidget";
import LinkCollectionWidget from "../widgets/LinkWidget/LinkCollectionWidget";

type Props = {
  data: WidgetViewData;
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
        layouts={getLayouts()}
        maxRows={10}
        autoSize={false}
      >
        <div className="flex items-center justify-center bg-black" key="time">
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
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}
