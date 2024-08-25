import { produce } from "immer";
import makeLayoutsStatic from "~/application/client/makeLayoutsStatic.service";
import { type RGLayout } from "~/lib/types/widget";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { rglToAwl } from "~/server/domain/layout/services/transform.service";
import { useBoundStore } from "../state";
import ChangeWidgetCommand from "./changeWidgetCommand";
import { type Command } from "./command";
import HideWidgetCommand from "./hideWidgetCommand";
import RevealWidgetCommand from "./revealWidgetCommand";

/**
 * is triggered, when the edit mode is closed by pressing the save button
 */
export default class SaveLayoutCommand implements Command {
  name: string;
  description: string;
  session: string;
  history: Command[];
  batch: Command[]; // just for tracking
  callback: (awLayout: AdjustedWidgetLayout[], rgLayout: RGLayout) => void;

  constructor(
    session: string,
    history: Command[],
    callback: (awLayout: AdjustedWidgetLayout[], rgLayout: RGLayout) => void,
  ) {
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

    const staticRgLayout = produce(editedWidgetLayout, (draft) => {
      const moveableLayout = makeLayoutsStatic(draft, true);
      return moveableLayout;
    });
    useBoundStore.getState().setWidgetLayout(staticRgLayout);

    const layoutTypes = useBoundStore.getState().layoutTypes;
    const awl = rglToAwl(staticRgLayout, layoutTypes);
    useBoundStore.getState().setAdjustedWidgetLayouts(awl);

    this.callback(awl, staticRgLayout);
  }

  rollback() {
    // TODO: implement rollback -> abortEditCommand?
    // useHiddenWidgetsStore
    //   .getState()
    //   .add(this.adjustedWidgetLayout, this.screenSize, true);
  }
}
