import { useBoundStore } from "../state";
import { type Command } from "./command";
import HideWidgetCommand from "./hideWidgetCommand";
import MoveWidgetCommand from "./moveWidgetCommand";
import RevealWidgetCommand from "./revealWidgetCommand";

export default class AbortEditCommand implements Command {
  name: string;
  description: string;
  session: string;
  history: Command[];
  batch: Command[];

  constructor(session: string, history: Command[]) {
    this.name = "abort-edit";
    this.description = "Abort changes made in layout edit mode";
    this.session = session;
    this.history = history;
    this.batch = []; // just for tracking
  }

  run() {
    // TODO: does this work correct allways?
    const editCommands = this.history.filter((command) => {
      command.session === this.session &&
        (command instanceof HideWidgetCommand ||
          command instanceof RevealWidgetCommand ||
          command instanceof MoveWidgetCommand);
    }) as (HideWidgetCommand | RevealWidgetCommand | MoveWidgetCommand)[];

    this.batch = editCommands;

    this.batch.forEach((command) => {
      command.rollback();
    });

    useBoundStore.getState().exitEditMode();
  }

  rollback() {
    useBoundStore.getState().initEditMode();
    // TODO: implement rollback -> saveLayoutCommand?
    // useHiddenWidgetsStore
    //   .getState()
    //   .add(this.adjustedWidgetLayout, this.screenSize, true);
  }
}
