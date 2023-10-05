import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  BREAKPOINTS,
  BREAKPOINT_COLS,
  GRID_MAX_ROW,
  GRID_ROW_HEIGHT,
} from "~/utils/const";

import { useAtom } from "jotai";
import getHidingClasses from "~/server/service/getHidingClassesService";
import transformLayoutsForGrid from "~/server/service/transformLayoutsService";
import CalendarWidget from "~/server/widgets/calendar/CalendarWidget";
import type { CalendarWidgetData } from "~/server/widgets/calendar/types";
import type { LinkWidgetData } from "~/server/widgets/links/types";
import SearchWidget from "~/server/widgets/search/SearchWidget";
import type { SearchWidgetData } from "~/server/widgets/search/types";
import TimeWidget from "~/server/widgets/time/TimeWidget";
import type { TimeWidgetData } from "~/server/widgets/time/types";
import { useDetectScreenSize } from "~/utils/hooks";
import { editModeAtom } from "~/utils/store";
import type { WidgetData } from "~/utils/types/widget";
import LinkCollectionWidget from "../server/widgets/links/LinkWidget/LinkCollectionWidget";

type Props = {
  data: WidgetData[];
};

const ResponsiveGridLayout = WidthProvider(Responsive);
export default function WidgetView(props: Props) {
  const currentScreenSize = useDetectScreenSize();
  const [editMode] = useAtom(editModeAtom);

  const adjustedBreakpoints = Object.entries(BREAKPOINTS).reduce(
    (acc, [key, value]) => {
      (acc as Record<string, number>)[key] = Math.max(value - 20, 0) as number;
      return acc;
    },
    {},
  );
  return (
    <div className="h-full">
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ ...adjustedBreakpoints }}
        cols={BREAKPOINT_COLS}
        rowHeight={GRID_ROW_HEIGHT}
        layouts={transformLayoutsForGrid(props.data, !editMode)}
        maxRows={GRID_MAX_ROW}
        autoSize={false}
      >
        {props.data.map(
          (widget) =>
            !getHidingClasses(widget.layout).includes(currentScreenSize) && (
              <div
                className={`flex items-center justify-center ${""}`}
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
            ),
        )}
      </ResponsiveGridLayout>
    </div>
  );
}
