import type ReactGridLayout from "react-grid-layout";
import { type ScreenSize } from "~/lib/types/types";
import { type RGLayout } from "~/lib/types/widget";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import AbortEditCommand from "./abortEditCommand";
import ChangeWidgetCommand from "./changeWidgetCommand";
import { type Command } from "./command";
import HideWidgetCommand from "./hideWidgetCommand";
import InitEditCommand from "./initEditCommand";
import InitLayoutCommand from "./initLayoutCommand";
import RevealWidgetCommand from "./revealWidgetCommand";
import SaveLayoutCommand from "./saveLayoutCommand";
import UpdateEditLayoutCommand from "./updateEditLayoutCommand";

export default class CommandManager {
  history: Command[];
  static #instance: CommandManager;
  session: string; // used to group certain commands like Hide and Unhide

  private constructor() {
    this.history = [];
    this.session = "";
    this.refreshSession();
  }

  public static get instance(): CommandManager {
    if (!CommandManager.#instance) {
      CommandManager.#instance = new CommandManager();
    }

    return CommandManager.#instance;
  }

  execute(command: Command) {
    command.run();
    this.history.push(command);
  }

  refreshSession() {
    this.session = crypto.randomUUID();
  }

  hideWidget(
    adjustedWidgetLayout: AdjustedWidgetLayout,
    screenSize: ScreenSize,
  ) {
    const command = new HideWidgetCommand(
      adjustedWidgetLayout,
      screenSize,
      this.session,
    );
    this.history.push(command);
    this.execute(command);
  }

  revealWidget(
    adjustedWidgetLayout: AdjustedWidgetLayout,
    screenSize: ScreenSize,
  ) {
    const command = new RevealWidgetCommand(
      adjustedWidgetLayout,
      screenSize,
      this.session,
    );
    this.history.push(command);
    this.execute(command);
  }

  saveEditLayout(
    callback: (awLayout: AdjustedWidgetLayout[], rgLayout: RGLayout) => void,
  ) {
    const command = new SaveLayoutCommand(this.session, this.history, callback);
    this.execute(command);
    this.history.push(command);
    this.refreshSession();
  }

  initLayout(adjustedWidgetLayout: AdjustedWidgetLayout[]) {
    const command = new InitLayoutCommand(this.session, adjustedWidgetLayout);
    this.execute(command);
    this.history.push(command);
    this.refreshSession();
  }

  updateEditLayout(layout: RGLayout) {
    const command = new UpdateEditLayoutCommand(this.session, layout);
    this.execute(command);
    this.history.push(command);
  }

  changeWidget(
    oldItem: ReactGridLayout.Layout,
    newItem: ReactGridLayout.Layout,
    newLayout: ReactGridLayout.Layout[],
    currentScreenSize: ScreenSize,
  ) {
    const command = new ChangeWidgetCommand(
      this.session,
      oldItem,
      newItem,
      newLayout,
      currentScreenSize,
    );
    this.execute(command);
    this.history.push(command);
  }

  abortEdit() {
    const command = new AbortEditCommand(this.session, this.history);
    this.execute(command);
    this.history.push(command);
    this.refreshSession();
  }

  initEdit() {
    this.refreshSession();
    const command = new InitEditCommand(this.session);
    this.history.push(command);
    this.execute(command);
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.rollback();
    }
  }
}
