import { type StateCreator } from "zustand";

export interface EditModeSlice {
  editMode: boolean;
  initEditMode: () => void;
  exitEditMode: () => void;
}

const createEditModeSlice: StateCreator<EditModeSlice> = (set) => ({
  editMode: false,
  initEditMode: () => set(() => ({ editMode: true })),
  exitEditMode: () => set(() => ({ editMode: false })),
});

export default createEditModeSlice;
