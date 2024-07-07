import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import createEditModeSlice, { type EditModeSlice } from "./editModeSlice";
import createEditedWidgetLayoutSlice, {
  type EditedWidgetSlice,
} from "./editedWidgetLayoutSlice";
import createHiddenWidgetsSlice, {
  type HiddenWidgetsSlice,
} from "./hiddenSlice";
import createWidgetLayoutSlice, {
  type WidgetLayoutSlice,
} from "./widgetLayoutSlice";

export const useBoundStore = create<
  HiddenWidgetsSlice & EditModeSlice & WidgetLayoutSlice & EditedWidgetSlice
>()(
  immer((...a) => ({
    ...createHiddenWidgetsSlice(...a),
    ...createEditModeSlice(...a),
    ...createWidgetLayoutSlice(...a),
    ...createEditedWidgetLayoutSlice(...a),
  })),
);
