import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import createEditModeSlice, { type EditModeSlice } from "./state/editModeSlice";
import createEditedWidgetLayoutSlice, {
  type EditedWidgetSlice,
} from "./state/editedWidgetLayoutSlice";
import createHiddenWidgetsSlice, {
  type HiddenWidgetsSlice,
} from "./state/hiddenSlice";
import createWidgetLayoutSlice, {
  type WidgetLayoutSlice,
} from "./state/widgetLayoutSlice";

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
