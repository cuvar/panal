// TODO: the current display of hidden widgets (means: unhiding) is not working as well as aborting the action
// ! -> execution
// ! -> rollback
// ! moving widgets should be a command as well

import { type ScreenSize } from "~/lib/types/types";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import AbortEditCommand from "./abortEditCommand";
import { type Command } from "./command";
import HideWidgetCommand from "./hideWidgetCommand";
import SaveLayoutCommand from "./saveLayoutCommand";
import UnhideWidgetCommand from "./unhideWidgetCommand";

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

  unhideWidget(
    adjustedWidgetLayout: AdjustedWidgetLayout,
    screenSize: ScreenSize,
  ) {
    const command = new UnhideWidgetCommand(
      adjustedWidgetLayout,
      screenSize,
      this.session,
    );
    this.history.push(command);
    this.execute(command);
  }

  saveLayout(callback: () => void) {
    const command = new SaveLayoutCommand(this.session, this.history, callback);
    this.execute(command);
    this.history.push(command);
    this.refreshSession();
  }

  abortEdit(callback: () => void) {
    const command = new AbortEditCommand(this.session, this.history, callback);
    this.execute(command);
    this.history.push(command);
    this.refreshSession();
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.rollback();
    }
  }
}
