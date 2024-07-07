import { produce } from "immer";
import { addWidgetToScreenSize } from "~/client/services/transformLayoutsService";
import { type ScreenSize } from "~/lib/types/types";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { useBoundStore } from "../state";
import { type Command } from "./command";

export default class RevealWidgetCommand implements Command {
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
    this.name = "revela-widget";
    this.description = "Reveal the widget";
    this.adjustedWidgetLayout = adjustedWidgetLayout;
    this.screenSize = screenSize;
    this.session = session;
  }

  run() {
    // could be
    // 1. unhide a previously hidden widget
    // 2. first time reveal a widget that was hidden long ago and whose state is persisted
    useBoundStore
      .getState()
      .addApparentWidget(this.adjustedWidgetLayout, this.screenSize, true);
    this._updateLayout();
  }

  _updateLayout() {
    const editMode = useBoundStore.getState().editMode;
    const editedWidgetLayout = useBoundStore.getState().editedWidgetLayout;

    if (!editMode || !editedWidgetLayout[this.screenSize]) return;

    const newLayout = produce(editedWidgetLayout, (draft) => {
      const adjustedLayout = addWidgetToScreenSize(
        this.adjustedWidgetLayout,
        this.screenSize,
        draft,
        false,
      );
      return adjustedLayout;
    });

    useBoundStore.getState().setEditedWidgetLayout(newLayout);
  }

  rollback() {
    useBoundStore
      .getState()
      .addApparentWidget(this.adjustedWidgetLayout, this.screenSize, false);

    this._updateLayout();
  }
}
