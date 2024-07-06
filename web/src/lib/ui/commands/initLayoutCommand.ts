import transformLayoutsForGrid from "~/client/services/transformLayoutsService";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { useBoundStore } from "../state";
import { type Command } from "./command";

export default class InitLayoutCommand implements Command {
  name: string;
  description: string;
  session: string;
  adjustedWidgetLayout: AdjustedWidgetLayout[];

  constructor(session: string, layout: AdjustedWidgetLayout[]) {
    this.name = "init-layout";
    this.description = "Initializies layout during initial loading";
    this.session = session;
    this.adjustedWidgetLayout = layout;
  }

  run() {
    const editMode = false;
    const transformedLayouts = transformLayoutsForGrid(
      this.adjustedWidgetLayout,
      !editMode,
    );
    useBoundStore.getState().setWidgetLayout(transformedLayouts);
  }

  rollback() {
    // TODO: implement rollback -> saveLayoutCommand?
  }
}
