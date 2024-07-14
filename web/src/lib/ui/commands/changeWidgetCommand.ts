import { produce } from "immer";
import type ReactGridLayout from "react-grid-layout";
import { type ScreenSize } from "~/lib/types/types";
import { useBoundStore } from "../state";
import { type Command } from "./command";

export default class ChangeWidgetCommand implements Command {
  name: string;
  description: string;
  session: string;
  oldItem: ReactGridLayout.Layout;
  newItem: ReactGridLayout.Layout;
  newLayout: ReactGridLayout.Layout[];
  currentScreenSize: ScreenSize;

  constructor(
    session: string,
    oldItem: ReactGridLayout.Layout,
    newItem: ReactGridLayout.Layout,
    newLayout: ReactGridLayout.Layout[],
    currentScreenSize: ScreenSize,
  ) {
    this.name = "init-layout";
    this.description = "Initializies layout during initial loading";
    this.session = session;
    this.oldItem = oldItem;
    this.newItem = newItem;
    this.newLayout = newLayout;
    this.currentScreenSize = currentScreenSize;
  }

  run() {
    // * 1. update editedWidgetLayout
    const editedWidgetLayout = useBoundStore.getState().editedWidgetLayout;
    const newEditedWidgetLayout = produce(editedWidgetLayout, (draft) => {
      draft[this.currentScreenSize] = this.newLayout;
    });
    useBoundStore.getState().setEditedWidgetLayout(newEditedWidgetLayout);

    // * 2. update adjustedWidgetLayout
    const adjustedWidgetLayouts =
      useBoundStore.getState().adjustedWidgetLayouts;

    const newAdjustedWidgetLayouts = produce(adjustedWidgetLayouts, (draft) => {
      const affectedAWL = draft.find((widget) => widget.id === this.newItem.i);
      if (affectedAWL) {
        affectedAWL.layout[this.currentScreenSize] = {
          x: this.newItem.x,
          y: this.newItem.y,
          w: this.newItem.w,
          h: this.newItem.h,
        };
      }
    });

    useBoundStore.getState().setAdjustedWidgteLayouts(newAdjustedWidgetLayouts);
  }

  rollback() {
    //
  }
}
