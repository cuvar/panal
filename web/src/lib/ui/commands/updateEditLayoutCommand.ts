import { type RGLayout } from "~/server/domain/layout/layout";
import { useBoundStore } from "../state";
import { type Command } from "./command";

/**
 * is triggered, when the layout is changed (e.g. by resizing the screen)
 */
export default class UpdateEditLayoutCommand implements Command {
  name: string;
  description: string;
  session: string;
  layout: RGLayout;
  prevLayout: RGLayout;

  constructor(session: string, layout: RGLayout) {
    this.name = "update-layout";
    this.description = "Updates layout during edit mode";
    this.session = session;
    this.layout = layout;
    this.prevLayout = {};
  }

  run() {
    this.prevLayout = useBoundStore.getState().editedWidgetLayout;
    useBoundStore.getState().setEditedWidgetLayout(this.layout);
  }

  rollback() {
    useBoundStore.getState().setEditedWidgetLayout(this.prevLayout);
  }
}
