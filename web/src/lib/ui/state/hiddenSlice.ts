import { type StateCreator } from "zustand";
import { type ScreenSize } from "~/lib/types/types";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { type WidgetVisibility } from "~/server/domain/layout/widgetVisibility";

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
      const existingWidget = state.apparentWidgets.find(
        (w) => w.widget.id == widget.id,
      ) ?? { widget, screenSize, visible: visible }; // this `visible` value is just a placeholder, below is more relevant

      existingWidget.visible = visible;
      return { apparentWidgets: [...state.apparentWidgets, existingWidget] };
    }),
});

export default createApparentWidgetsSlice;
