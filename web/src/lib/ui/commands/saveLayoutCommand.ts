import { useBoundStore } from "../state";
import { type Command } from "./command";
import HideWidgetCommand from "./hideWidgetCommand";
import UnhideWidgetCommand from "./unhideWidgetCommand";

export default class SaveLayoutCommand implements Command {
  name: string;
  description: string;
  session: string;
  history: Command[];
  batch: Command[];
  callback: () => void;

  constructor(session: string, history: Command[], callback: () => void) {
    this.name = "save-layout";
    this.description = "Save new widget layout after editing";
    this.session = session;
    this.history = history;
    this.batch = [];
    this.callback = callback;
  }

  run() {
    // TODO: does this work correct allways?
    const editCommands = this.history.filter((command) => {
      command.session === this.session &&
        (command instanceof HideWidgetCommand ||
          command instanceof UnhideWidgetCommand);
    }) as (HideWidgetCommand | UnhideWidgetCommand)[];
    this.batch = editCommands;

    useBoundStore.getState().exitEditMode();

    this.callback();
  }

  rollback() {
    // TODO: implement rollback -> abortEditCommand?
    // useHiddenWidgetsStore
    //   .getState()
    //   .add(this.adjustedWidgetLayout, this.screenSize, true);
  }
}
