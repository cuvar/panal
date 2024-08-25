import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import createAdjustedWidgetLayoutSlice, {
  type AdjustedWidgetLayoutSlice,
} from "./adjustedWidgetLayoutSlice";
import createEditModeSlice, { type EditModeSlice } from "./editModeSlice";
import createEditedWidgetLayoutSlice, {
  type EditedWidgetSlice,
} from "./editedWidgetLayoutSlice";
import createApparentWidgetsSlice, {
  type ApparentWidgetsSlice,
} from "./hiddenSlice";
import createLayoutTypeSlice, { type LayoutTypeSlice } from "./layoutTypeSlice";
import createWidgetLayoutSlice, {
  type WidgetLayoutSlice,
} from "./widgetLayoutSlice";

export const useBoundStore = create<
  ApparentWidgetsSlice &
    EditModeSlice &
    WidgetLayoutSlice &
    EditedWidgetSlice &
    AdjustedWidgetLayoutSlice &
    LayoutTypeSlice
>()(
  immer((...a) => ({
    ...createApparentWidgetsSlice(...a),
    ...createEditModeSlice(...a),
    ...createWidgetLayoutSlice(...a),
    ...createEditedWidgetLayoutSlice(...a),
    ...createAdjustedWidgetLayoutSlice(...a),
    ...createLayoutTypeSlice(...a),
  })),
);
