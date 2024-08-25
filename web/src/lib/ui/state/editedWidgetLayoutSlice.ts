import { type StateCreator } from "zustand";
import { type RGLayout } from "~/lib/types/widget";

export interface EditedWidgetSlice {
  editedWidgetLayout: RGLayout;
  setEditedWidgetLayout: (newLayout: RGLayout) => void;
}

const createEditedWidgetLayoutSlice: StateCreator<EditedWidgetSlice> = (
  set,
) => ({
  editedWidgetLayout: {},
  setEditedWidgetLayout: (newLayout) =>
    set(() => ({ editedWidgetLayout: newLayout })),
});

export default createEditedWidgetLayoutSlice;
