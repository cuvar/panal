import type ReactGridLayout from "react-grid-layout";
import { type Command } from "./command";

export default class MoveWidgetCommand implements Command {
  name: string;
  description: string;
  session: string;
  oldItem: ReactGridLayout.Layout;
  newItem: ReactGridLayout.Layout;

  constructor(
    session: string,
    oldItem: ReactGridLayout.Layout,
    newItem: ReactGridLayout.Layout,
  ) {
    this.name = "init-layout";
    this.description = "Initializies layout during initial loading";
    this.session = session;
    this.oldItem = oldItem;
    this.newItem = newItem;
  }

  run() {
    // TODO: implement run
  }

  rollback() {
    //
  }
}
