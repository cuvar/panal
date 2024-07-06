import { type StateCreator } from "zustand";
import { type ScreenSize } from "~/lib/types/types";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { type HideInfo } from "~/server/domain/layout/hideInfo";

export interface HiddenWidgetsSlice {
  hiddenWidgets: HideInfo[];
  addHiddenWidget: (
    widget: AdjustedWidgetLayout,
    screenSize: ScreenSize,
    hide: boolean,
  ) => void;
  removeHiddenWidget: (
    widget: AdjustedWidgetLayout,
    screenSize: ScreenSize,
  ) => void;
  clearHiddenWidgets: () => void;
}

const createHiddenWidgetsSlice: StateCreator<HiddenWidgetsSlice> = (set) => ({
  hiddenWidgets: [],
  addHiddenWidget: (widget, screenSize, hide) =>
    set((state) => {
      const existingId = state.hiddenWidgets
        .map((w) => w.widget.id)
        .includes(widget.id);
      if (existingId) return state;

      return {
        hiddenWidgets: [...state.hiddenWidgets, { widget, screenSize, hide }],
      };
    }),
  removeHiddenWidget: (widget, screenSize) =>
    set((state) => {
      // ! Don't know whether this works because of object references
      const hiddenWidget = state.hiddenWidgets.find(
        (w) => w.widget.id === widget.id && w.screenSize === screenSize,
      );
      if (!hiddenWidget) return state;
      const index = state.hiddenWidgets.indexOf(hiddenWidget);
      if (index !== -1) {
        state.hiddenWidgets.splice(index, 1);
      }
      return { hiddenWidgets: state.hiddenWidgets };
    }),
  clearHiddenWidgets: () => set({ hiddenWidgets: [] }),
});

export default createHiddenWidgetsSlice;
