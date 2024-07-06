import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  BREAKPOINTS,
  BREAKPOINT_COLS,
  GRID_MAX_ROW,
  GRID_ROW_HEIGHT,
} from "~/lib/basic/const";

import { useAtom } from "jotai";
import { useEffect } from "react";
import getHidingClasses from "~/client/services/getHidingClassesService";
import transformLayoutsForGrid from "~/client/services/transformLayoutsService";
import { useDetectScreenSize } from "~/lib/ui/hooks";
import {
  editModeAtom,
  editedWidgetLayoutAtom,
  widgetLayoutAtom,
} from "~/lib/ui/store";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import ResizeHandle from "./ResizeHandle";
import WidgetWrapper from "./WidgetWrapper";

type Props = {
  layout: AdjustedWidgetLayout[];
};

const ResponsiveGridLayout = WidthProvider(Responsive);
export default function WidgetView(props: Props) {
  const currentScreenSize = useDetectScreenSize();
  const [editMode] = useAtom(editModeAtom);
  const [widgetLayout, setWidgetLayout] = useAtom(widgetLayoutAtom);
  const [editedWidgetLayout, setEditedWidgetLayout] = useAtom(
    editedWidgetLayoutAtom,
  );

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

  useEffect(() => {
    if (editMode) {
      setWidgetLayout(editedWidgetLayout);
    }
    // const transformedLayouts = transformLayoutsForGrid(props.layout, !editMode);
    // setWidgetLayout(transformedLayouts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedWidgetLayout]);

  function handleLayoutChange(
    layout: ReactGridLayout.Layout[],
    layouts: ReactGridLayout.Layouts,
  ) {
    if (!editMode) return;
    setEditedWidgetLayout(layouts);
  }
  return (
    <div className="z-10 h-screen w-full max-w-[1280px]">
      {props.layout.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-4 text-foreground">
          <h1 className="text-2xl font-bold">No widgets available.</h1>
          <p className="text-md">
            Please add some widgets or check for issues.
          </p>
        </div>
      ) : (
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
          resizeHandle={<ResizeHandle />}
        >
          {props.layout.map(
            (widget) =>
              !getHidingClasses(widget.layout).includes(currentScreenSize) && (
                // ! this is needed for ResizeHandle to be visible
                <div key={widget.id} className="">
                  <WidgetWrapper
                    key={widget.id}
                    editMode={editMode}
                    widget={widget}
                  />
                </div>
              ),
          )}
        </ResponsiveGridLayout>
      )}
    </div>
  );
}
