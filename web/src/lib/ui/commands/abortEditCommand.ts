import { type Command } from "./command";
import HideWidgetCommand from "./hideWidgetCommand";
import UnhideWidgetCommand from "./unhideWidgetCommand";

export default class AbortEditCommand implements Command {
  name: string;
  description: string;
  session: string;
  history: Command[];
  batch: Command[];
  callback: () => void;

  constructor(session: string, history: Command[], callback: () => void) {
    this.name = "abort-edit";
    this.description = "Abort changes made in layout edit mode";
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

    this.batch.forEach((command) => {
      command.rollback();
    });

    this.callback();
  }

  rollback() {
    // TODO: implement rollback -> saveLayoutCommand?
    // useHiddenWidgetsStore
    //   .getState()
    //   .add(this.adjustedWidgetLayout, this.screenSize, true);
  }
}
