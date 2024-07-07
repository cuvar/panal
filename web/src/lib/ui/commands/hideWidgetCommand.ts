import { produce } from "immer";
import { type ScreenSize } from "~/lib/types/types";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { useBoundStore } from "../state";
import { type Command } from "./command";

export default class HideWidgetCommand implements Command {
  name: string;
  description: string;
  adjustedWidgetLayout: AdjustedWidgetLayout;
  screenSize: ScreenSize;
  session: string;

  constructor(
    adjustedWidgetLayout: AdjustedWidgetLayout,
    screenSize: ScreenSize,
    session: string,
  ) {
    this.name = "hide-widget";
    this.description = "Hide the widget";
    this.adjustedWidgetLayout = adjustedWidgetLayout;
    this.screenSize = screenSize;
    this.session = session;
  }

  run() {
    // could be
    // 1. unhide a previously hidden widget
    // 2. first time reveal a widget that was hidden long ago and whose state is persisted
    // -> solution: take widget and set to false
    useBoundStore
      .getState()
      .addApparentWidget(this.adjustedWidgetLayout, this.screenSize, false);

    this._updateEditedWidgetLayout();
  }

  _updateEditedWidgetLayout() {
    const editedWidgetLayout = useBoundStore.getState().editedWidgetLayout;

    const newState = produce(editedWidgetLayout, (draft) => {
      const layout = draft[this.screenSize]?.find(
        (widget) => widget.i === this.adjustedWidgetLayout.id,
      );

      if (!layout) {
        return draft;
      }

      const index = draft[this.screenSize]?.indexOf(layout) ?? -1;
      if (index === -1) {
        return draft;
      }

      draft[this.screenSize]?.splice(index, 1);
    });

    useBoundStore.getState().setEditedWidgetLayout(newState);
  }

  rollback() {
    useBoundStore
      .getState()
      .addApparentWidget(this.adjustedWidgetLayout, this.screenSize, true);

    this._updateEditedWidgetLayout();
  }
}
