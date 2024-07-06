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
    useBoundStore
      .getState()
      .addHiddenWidget(this.adjustedWidgetLayout, this.screenSize, true);

    this._updateEditedWidgetLayout();
  }

  _updateEditedWidgetLayout() {
    const editedWidgetLayout = useBoundStore.getState().editedWidgetLayout;

    const layout = editedWidgetLayout[this.screenSize]?.find(
      (widget) => widget.i === this.adjustedWidgetLayout.id,
    );
    if (!layout) return;
    const index = editedWidgetLayout[this.screenSize]?.indexOf(layout) ?? -1;
    if (index === -1) return;
    editedWidgetLayout[this.screenSize]?.splice(index, 1);

    console.log("editedWidgetLayout", editedWidgetLayout);
    useBoundStore.getState().setEditedWidgetLayout(editedWidgetLayout);
  }

  rollback() {
    // TODO: implement for editedWidgetLayout
    useBoundStore
      .getState()
      .removeHiddenWidget(this.adjustedWidgetLayout, this.screenSize);
  }
}
