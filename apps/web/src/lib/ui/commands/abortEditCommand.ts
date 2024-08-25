import { useBoundStore } from "../state";
import ChangeWidgetCommand from "./changeWidgetCommand";
import { type Command } from "./command";
import HideWidgetCommand from "./hideWidgetCommand";
import RevealWidgetCommand from "./revealWidgetCommand";

/**
 * is triggered, when the edit mode is aborted
 */
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
          command instanceof ChangeWidgetCommand);
    }) as (HideWidgetCommand | RevealWidgetCommand | ChangeWidgetCommand)[];

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
