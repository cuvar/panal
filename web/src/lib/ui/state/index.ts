import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import createEditModeSlice, { type EditModeSlice } from "./editModeSlice";
import createEditedWidgetLayoutSlice, {
  type EditedWidgetSlice,
} from "./editedWidgetLayoutSlice";
import createApparentWidgetsSlice, {
  type ApparentWidgetsSlice,
} from "./hiddenSlice";
import createWidgetLayoutSlice, {
  type WidgetLayoutSlice,
} from "./widgetLayoutSlice";

export const useBoundStore = create<
  ApparentWidgetsSlice & EditModeSlice & WidgetLayoutSlice & EditedWidgetSlice
>()(
  immer((...a) => ({
    ...createApparentWidgetsSlice(...a),
    ...createEditModeSlice(...a),
    ...createWidgetLayoutSlice(...a),
    ...createEditedWidgetLayoutSlice(...a),
  })),
);
