import { type StateCreator } from "zustand";
import { type LayoutType } from "~/lib/types/widget";

export interface LayoutTypeSlice {
  layoutTypes: LayoutType[];
  setLayouTypes: (layouts: LayoutType[]) => void;
}

const createLayoutTypeSlice: StateCreator<LayoutTypeSlice> = (set) => ({
  layoutTypes: [],
  setLayouTypes: (layouts) =>
    set(() => {
      return { layoutTypes: layouts };
    }),
});

export default createLayoutTypeSlice;
