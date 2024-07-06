import { type RGLayout } from "~/lib/types/types";
import { useBoundStore } from "../state";
import { type Command } from "./command";

export default class UpdateLayoutCommand implements Command {
  name: string;
  description: string;
  session: string;
  layout: RGLayout;

  constructor(session: string, layout: RGLayout) {
    this.name = "update-layout";
    this.description = "Updates layout during edit mode";
    this.session = session;
    this.layout = layout;
  }

  run() {
    useBoundStore.getState().setEditedWidgetLayout(this.layout);
  }

  rollback() {
    // TODO: implement rollback -> saveLayoutCommand?
  }
}
