import { type StateCreator } from "zustand";
import { type RGLayout } from "~/server/domain/layout/layout";

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
