import { produce } from "immer";
import makeLayoutsStatic from "~/client/services/makeLayoutsStaticService";
import { transformRGLToAWL } from "~/client/services/transformLayoutsService";
import { useBoundStore } from "../state";
import ChangeWidgetCommand from "./changeWidgetCommand";
import { type Command } from "./command";
import HideWidgetCommand from "./hideWidgetCommand";
import RevealWidgetCommand from "./revealWidgetCommand";

export default class SaveLayoutCommand implements Command {
  name: string;
  description: string;
  session: string;
  history: Command[];
  batch: Command[]; // just for tracking
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
          command instanceof RevealWidgetCommand ||
          command instanceof ChangeWidgetCommand);
    }) as (HideWidgetCommand | RevealWidgetCommand | ChangeWidgetCommand)[];
    this.batch = editCommands;

    useBoundStore.getState().exitEditMode();
    const editedWidgetLayout = useBoundStore.getState().editedWidgetLayout;

    const staticLayout = produce(editedWidgetLayout, (draft) => {
      const moveableLayout = makeLayoutsStatic(draft, true);
      return moveableLayout;
    });

    useBoundStore.getState().setWidgetLayout(staticLayout);
    const currentAWL = useBoundStore.getState().adjustedWidgetLayouts;
    const awl = transformRGLToAWL(staticLayout, currentAWL);
    useBoundStore.getState().setAdjustedWidgteLayouts(awl);

    this.callback();
  }

  rollback() {
    // TODO: implement rollback -> abortEditCommand?
    // useHiddenWidgetsStore
    //   .getState()
    //   .add(this.adjustedWidgetLayout, this.screenSize, true);
  }
}
