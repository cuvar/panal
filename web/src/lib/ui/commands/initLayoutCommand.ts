import transformLayoutsForGrid from "~/client/services/transformLayoutsService";
import { type RGLayout } from "~/lib/types/types";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { useBoundStore } from "../state";
import { type Command } from "./command";

export default class InitLayoutCommand implements Command {
  name: string;
  description: string;
  session: string;
  adjustedWidgetLayouts: AdjustedWidgetLayout[];
  prevLayout: RGLayout;

  constructor(session: string, layouts: AdjustedWidgetLayout[]) {
    this.name = "init-layout";
    this.description = "Initializies layout during initial loading";
    this.session = session;
    this.adjustedWidgetLayouts = layouts;
    this.prevLayout = {};
  }

  run() {
    const editMode = false;
    const transformedLayouts = transformLayoutsForGrid(
      this.adjustedWidgetLayouts,
      !editMode,
    );
    useBoundStore
      .getState()
      .setAdjustedWidgteLayouts(this.adjustedWidgetLayouts);
    this.prevLayout = useBoundStore.getState().widgetLayout;
    useBoundStore.getState().setWidgetLayout(transformedLayouts);
  }

  rollback() {
    useBoundStore.getState().setWidgetLayout(this.prevLayout);
  }
}
