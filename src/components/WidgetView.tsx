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
import { useEffect } from "react";
import getHidingClasses from "~/client/services/getHidingClassesService";
import transformLayoutsForGrid from "~/client/services/transformLayoutsService";
import type { WidgetData } from "~/server/entities/widgetData";
import CalendarWidget from "~/server/widgets/calendar/CalendarWidget";
import type { CalendarWidgetData } from "~/server/widgets/calendar/types";
import type { LinkWidgetData } from "~/server/widgets/links/types";
import SearchWidget from "~/server/widgets/search/SearchWidget";
import type { SearchWidgetData } from "~/server/widgets/search/types";
import TimeWidget from "~/server/widgets/time/TimeWidget";
import type { TimeWidgetData } from "~/server/widgets/time/types";
import { useDetectScreenSize } from "~/utils/hooks";
import {
  editModeAtom,
  editedWidgetLayoutAtom,
  widgetLayoutAtom,
} from "~/utils/store";
import LinkCollectionWidget from "../server/widgets/links/LinkWidget/LinkCollectionWidget";

type Props = {
  data: WidgetData[];
};

const ResponsiveGridLayout = WidthProvider(Responsive);
export default function WidgetView(props: Props) {
  const currentScreenSize = useDetectScreenSize();
  const [editMode] = useAtom(editModeAtom);
  const [widgetLayout, setWidgetLayout] = useAtom(widgetLayoutAtom);
  const [, setEditedWidgetLayout] = useAtom(editedWidgetLayoutAtom);

  const adjustedBreakpoints = Object.entries(BREAKPOINTS).reduce(
    (acc, [key, value]) => {
      (acc as Record<string, number>)[key] = Math.max(value - 20, 0) as number;
      return acc;
    },
    {},
  );

  useEffect(() => {
    const transformedLayouts = transformLayoutsForGrid(props.data, !editMode);
    setWidgetLayout(transformedLayouts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  function handleLayoutChange(
    layout: ReactGridLayout.Layout[],
    layouts: ReactGridLayout.Layouts,
  ) {
    if (!editMode) return;
    setEditedWidgetLayout(layouts);
  }

  return (
    <div className="h-full w-full max-w-[1280px]">
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ ...adjustedBreakpoints }}
        cols={BREAKPOINT_COLS}
        rowHeight={GRID_ROW_HEIGHT}
        layouts={widgetLayout}
        maxRows={GRID_MAX_ROW}
        autoSize={false}
        onLayoutChange={handleLayoutChange}
      >
        {props.data.map(
          (widget) =>
            !getHidingClasses(widget.layout).includes(currentScreenSize) && (
              <div
                className={`flex items-center justify-center ${
                  editMode ? "rounded-md border-2 border-panal-700" : ""
                }`}
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
