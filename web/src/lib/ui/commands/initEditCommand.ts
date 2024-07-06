import makeLayoutsStatic from "~/client/services/makeLayoutsStaticService";
import { useBoundStore } from "../state";
import { type Command } from "./command";

export default class InitEditCommand implements Command {
  name: string;
  description: string;
  session: string;

  constructor(session: string) {
    this.name = "init-edit";
    this.description = "Initialize the edit mode";
    this.session = session;
  }

  run() {
    useBoundStore.getState().initEditMode();
    const widgetLayout = useBoundStore.getState().widgetLayout;
    // deepcopy necessary because of immer middleware
    const moveableLayout = makeLayoutsStatic(
      structuredClone(widgetLayout),
      false,
    );
    useBoundStore.getState().setEditedWidgetLayout(moveableLayout);
  }

  rollback() {
    // TODO: implement
    // useEditModeStore.getState().exit();
  }
}
