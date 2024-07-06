import makeLayoutsStatic from "~/client/services/makeLayoutsStaticService";
import { addWidgetToScreenSize } from "~/client/services/transformLayoutsService";
import { type ScreenSize } from "~/lib/types/types";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { useBoundStore } from "../state";
import { type Command } from "./command";

export default class UnhideWidgetCommand implements Command {
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
    this.name = "unhide-widget";
    this.description = "Reveal the widget";
    this.adjustedWidgetLayout = adjustedWidgetLayout;
    this.screenSize = screenSize;
    this.session = session;
  }

  run() {
    useBoundStore
      .getState()
      .removeHiddenWidget(this.adjustedWidgetLayout, this.screenSize);

    this._updateLayout();
  }

  _updateLayout() {
    const editMode = useBoundStore.getState().editMode;
    const editedWidgetLayout = useBoundStore.getState().editedWidgetLayout;
    const setEditedWidgetLayout =
      useBoundStore.getState().setEditedWidgetLayout;
    const setWidgetLayout = useBoundStore.getState().setWidgetLayout;

    if (!editMode || !editedWidgetLayout[this.screenSize]) return; // only allow in editMode
    const newLayout = addWidgetToScreenSize(
      this.adjustedWidgetLayout,
      this.screenSize,
      editedWidgetLayout,
      false,
    );

    setEditedWidgetLayout(newLayout);
    // deepcopy necessary because of immer middleware
    const moveableLayout = makeLayoutsStatic(structuredClone(newLayout), false);
    setWidgetLayout(moveableLayout);
  }

  rollback() {
    useBoundStore
      .getState()
      .addHiddenWidget(this.adjustedWidgetLayout, this.screenSize, true);
  }
}
