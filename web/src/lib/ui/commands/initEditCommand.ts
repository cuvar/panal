import { produce } from "immer";
import makeLayoutsStatic from "~/application/layout/makeLayoutsStatic.service";
import { type RGLayout } from "~/server/domain/layout/layout";
import { useBoundStore } from "../state";
import { type Command } from "./command";

/**
 * is triggered, when the edit mode is initialized
 */
export default class InitEditCommand implements Command {
  name: string;
  description: string;
  session: string;
  prevLayout: RGLayout;

  constructor(session: string) {
    this.name = "init-edit";
    this.description = "Initialize the edit mode";
    this.session = session;
    this.prevLayout = {};
  }

  run() {
    useBoundStore.getState().initEditMode();
    this.prevLayout = useBoundStore.getState().editedWidgetLayout;

    const widgetLayout = useBoundStore.getState().widgetLayout;
    const moveableLayout = produce(widgetLayout, (draft) => {
      const moveableLayout = makeLayoutsStatic(draft, false);
      return moveableLayout;
    });

    useBoundStore.getState().setEditedWidgetLayout(moveableLayout);
  }

  rollback() {
    useBoundStore.getState().exitEditMode();
    useBoundStore.getState().setEditedWidgetLayout(this.prevLayout);
  }
}
