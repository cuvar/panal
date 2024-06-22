import { type ScreenSize } from "~/lib/types/types";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { useHiddenWidgetsStore } from "../state";
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
    useHiddenWidgetsStore
      .getState()
      .remove(this.adjustedWidgetLayout, this.screenSize);
  }

  rollback() {
    useHiddenWidgetsStore
      .getState()
      .add(this.adjustedWidgetLayout, this.screenSize, true);
  }
}
