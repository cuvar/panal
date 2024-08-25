import { type StateCreator } from "zustand";
import { type RGLayout } from "~/server/domain/layout/layout";

export interface WidgetLayoutSlice {
  widgetLayout: RGLayout;
  setWidgetLayout: (newLayout: RGLayout) => void;
}

const createWidgetLayoutSlice: StateCreator<WidgetLayoutSlice> = (set) => ({
  widgetLayout: {},
  setWidgetLayout: (newLayout) => set(() => ({ widgetLayout: newLayout })),
});

export default createWidgetLayoutSlice;
