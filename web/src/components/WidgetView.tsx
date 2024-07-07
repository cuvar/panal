import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  BREAKPOINTS,
  BREAKPOINT_COLS,
  GRID_MAX_ROW,
  GRID_ROW_HEIGHT,
} from "~/lib/basic/const";

import { useEffect } from "react";
import { type RGLayout } from "~/lib/types/types";
import { useCommandManager, useDisplayedWidgets } from "~/lib/ui/hooks";
import { useBoundStore } from "~/lib/ui/state";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import ResizeHandle from "./ResizeHandle";
import WidgetWrapper from "./WidgetWrapper";

type Props = {
  layout: AdjustedWidgetLayout[];
};

const ResponsiveGridLayout = WidthProvider(Responsive);
export default function WidgetView(props: Props) {
  const editMode = useBoundStore((state) => state.editMode);

  const { rgLayout, awLayout } = useDisplayedWidgets(props.layout);
  const commandManager = useCommandManager();

  const adjustedBreakpoints = Object.entries(BREAKPOINTS).reduce(
    (acc, [key, value]) => {
      (acc as Record<string, number>)[key] = Math.max(value - 20, 0) as number;
      return acc;
    },
    {},
  );

  useEffect(() => {
    commandManager.initLayout(props.layout);
  }, []);

  function handleLayoutChange(
    _layout: ReactGridLayout.Layout[],
    layouts: RGLayout,
  ) {
    commandManager.updateEditLayout(layouts);
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
          layouts={rgLayout}
          maxRows={GRID_MAX_ROW}
          compactType={null}
          autoSize={false}
          onLayoutChange={handleLayoutChange}
          isDroppable={true}
          resizeHandle={<ResizeHandle />}
        >
          {awLayout.map((widget) => (
            // ! this is needed for ResizeHandle to be visible
            <div key={widget.id}>
              <WidgetWrapper
                key={widget.id}
                editMode={editMode}
                widget={widget}
              />
            </div>
          ))}
        </ResponsiveGridLayout>
      )}
    </div>
  );
}
