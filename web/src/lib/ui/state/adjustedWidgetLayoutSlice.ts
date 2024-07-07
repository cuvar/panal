import { type StateCreator } from "zustand";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";

export interface AdjustedWidgetLayoutSlice {
  adjustedWidgetLayouts: AdjustedWidgetLayout[];
  setAdjustedWidgteLayouts: (layouts: AdjustedWidgetLayout[]) => void;
}

const createAdjustedWidgetLayoutSlice: StateCreator<
  AdjustedWidgetLayoutSlice
> = (set) => ({
  adjustedWidgetLayouts: [],
  setAdjustedWidgteLayouts: (layouts) =>
    set(() => {
      return { adjustedWidgetLayouts: layouts };
    }),
});

export default createAdjustedWidgetLayoutSlice;
