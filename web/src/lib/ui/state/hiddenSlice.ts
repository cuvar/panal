import { produce } from "immer";
import { type StateCreator } from "zustand";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { type WidgetVisibility } from "~/server/domain/layout/widgetVisibility";
import { type ScreenSize } from "~/server/domain/other/screenSize";

export interface ApparentWidgetsSlice {
  apparentWidgets: WidgetVisibility[];
  // widgets that should be hidden
  addApparentWidget: (
    widget: AdjustedWidgetLayout,
    screenSize: ScreenSize,
    visible: boolean,
  ) => void;
}

// ! should only toggle the `visible` property of the widget WidgetVisibility, only add entries and NOT remove any
// ! -> this way, re-appearing widgets can be tracked as well
const createApparentWidgetsSlice: StateCreator<ApparentWidgetsSlice> = (
  set,
) => ({
  apparentWidgets: [],
  addApparentWidget: (widget, screenSize, visible) =>
    set((state) => {
      const newApparentWidgets = produce(state.apparentWidgets, (draft) => {
        const existingWidget = draft.find((w) => w.widget.id == widget.id);
        if (existingWidget) {
          existingWidget.visible = visible;
          return draft;
        }
        const newEntry = {
          widget,
          screenSize,
          visible: visible, // this `visible` value is just a placeholder, below is more relevant
        };

        return [...draft, newEntry];
      });
      return { apparentWidgets: newApparentWidgets };
    }),
});

export default createApparentWidgetsSlice;
