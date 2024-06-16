import { create } from "zustand";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { type HideInfo } from "~/server/domain/layout/hideInfo";
import { type ScreenSize } from "../types/types";

interface HiddenWidgetsState {
  widgets: HideInfo[];
  add: (
    widget: AdjustedWidgetLayout,
    screenSize: ScreenSize,
    hide: boolean,
  ) => void;
  remove: (widget: AdjustedWidgetLayout, screenSize: ScreenSize) => void;
  clear: () => void;
}

export const useHiddenWidgetsStore = create<HiddenWidgetsState>()((set) => ({
  widgets: [],
  add: (widget, screenSize, hide) =>
    set((state) => {
      const existingId = state.widgets
        .map((w) => w.widget.id)
        .includes(widget.id);
      if (existingId) return state;

      return {
        widgets: [...state.widgets, { widget, screenSize, hide }],
      };
    }),
  remove: (widget, screenSize) =>
    set((state) => {
      // ! Don't know whether this works because of object references
      const hiddenWidget = state.widgets.find(
        (w) => w.widget.id === widget.id && w.screenSize === screenSize,
      );
      if (!hiddenWidget) return state;
      const index = state.widgets.indexOf(hiddenWidget);
      if (index !== -1) {
        state.widgets.splice(index, 1);
      }
      return { widgets: state.widgets };
    }),
  clear: () => set({ widgets: [] }),
}));
