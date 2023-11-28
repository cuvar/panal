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
import { type AdjustedWidgetLayout } from "~/server/entities/adjustedWidgetLayout";
import { useDetectScreenSize } from "~/utils/hooks";
import {
  editModeAtom,
  editedWidgetLayoutAtom,
  showHiddenWidgetsAtom,
  widgetLayoutAtom,
} from "~/utils/store";
import WidgetSidebar from "./WidgetSidebar";
import WidgetWrapper from "./WidgetWrapper";

type Props = {
  layout: AdjustedWidgetLayout[];
};

const ResponsiveGridLayout = WidthProvider(Responsive);
export default function WidgetView(props: Props) {
  const currentScreenSize = useDetectScreenSize();
  const [editMode] = useAtom(editModeAtom);
  const [widgetLayout, setWidgetLayout] = useAtom(widgetLayoutAtom);
  const [, setEditedWidgetLayout] = useAtom(editedWidgetLayoutAtom);
  const [showHiddenWidgets] = useAtom(showHiddenWidgetsAtom);

  const adjustedBreakpoints = Object.entries(BREAKPOINTS).reduce(
    (acc, [key, value]) => {
      (acc as Record<string, number>)[key] = Math.max(value - 20, 0) as number;
      return acc;
    },
    {},
  );

  useEffect(() => {
    const transformedLayouts = transformLayoutsForGrid(props.layout, !editMode);
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
    <div className="z-10 h-screen w-full max-w-[1280px]">
      {showHiddenWidgets && <WidgetSidebar />}
      {showHiddenWidgets && (
        <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-60"></div>
      )}
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ ...adjustedBreakpoints }}
        cols={BREAKPOINT_COLS}
        rowHeight={GRID_ROW_HEIGHT}
        layouts={widgetLayout}
        maxRows={GRID_MAX_ROW}
        compactType={null}
        autoSize={false}
        onLayoutChange={handleLayoutChange}
        isDroppable={true}
      >
        {props.layout.map(
          (widget) =>
            !getHidingClasses(widget.layout).includes(currentScreenSize) && (
              <div key={widget.id} className="flex ">
                <WidgetWrapper editMode={editMode} widget={widget} />
              </div>
            ),
        )}
      </ResponsiveGridLayout>
    </div>
  );
}
