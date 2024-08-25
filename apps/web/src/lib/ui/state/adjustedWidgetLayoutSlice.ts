import { type StateCreator } from "zustand";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";

export interface AdjustedWidgetLayoutSlice {
  adjustedWidgetLayouts: AdjustedWidgetLayout[];
  setAdjustedWidgetLayouts: (layouts: AdjustedWidgetLayout[]) => void;
}

const createAdjustedWidgetLayoutSlice: StateCreator<
  AdjustedWidgetLayoutSlice
> = (set) => ({
  adjustedWidgetLayouts: [],
  setAdjustedWidgetLayouts: (layouts) =>
    set(() => {
      return { adjustedWidgetLayouts: layouts };
    }),
});

export default createAdjustedWidgetLayoutSlice;
