import { produce } from "immer";
import { calcNewWidgetLayout } from "~/client/services/calcNewWidgetLayoutService";
import transformLayoutsForGrid from "~/client/services/transformLayoutsService";
import { type ScreenSize } from "~/lib/types/types";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { type WidgetVisibility } from "~/server/domain/layout/widgetVisibility";
import { useBoundStore } from "../state";
import { type Command } from "./command";

export default class RevealWidgetCommand implements Command {
  name: string;
  description: string;
  widgetVisibility: WidgetVisibility;
  session: string;

  constructor(
    adjustedWidgetLayout: AdjustedWidgetLayout,
    screenSize: ScreenSize,
    session: string,
  ) {
    this.name = "reveal-widget";
    this.description = "Reveal the widget";
    this.widgetVisibility = {
      widget: adjustedWidgetLayout,
      screenSize,
      visible: true,
    };
    this.session = session;
  }

  run() {
    // could be
    // 1. unhide a previously hidden widget
    // 2. first time reveal a widget that was hidden long ago and whose state is persisted
    useBoundStore
      .getState()
      .addApparentWidget(
        this.widgetVisibility.widget,
        this.widgetVisibility.screenSize,
        this.widgetVisibility.visible,
      );
    this._updateLayout();
  }

  _updateLayout() {
    const editMode = useBoundStore.getState().editMode;
    const editedWidgetLayout = useBoundStore.getState().editedWidgetLayout;
    const allAWLayouts = useBoundStore.getState().adjustedWidgetLayouts;

    if (!editMode || !editedWidgetLayout[this.widgetVisibility.screenSize]) {
      return;
    }

    // * 1. get new layout for added widget
    const newLayoutForRevealedWidget = produce(
      this.widgetVisibility,
      (draft) => {
        draft.widget = calcNewWidgetLayout(draft, allAWLayouts);
        return draft;
      },
    ).widget;

    // * 2. update adjustedWidgetLayout
    const newAllAWLayouts = produce(allAWLayouts, (draft) => {
      const existingWidget = draft.find((widget) => {
        return widget.id === newLayoutForRevealedWidget.id;
      });

      if (existingWidget) {
        const screen = this.widgetVisibility.screenSize;
        existingWidget.layout[screen] =
          newLayoutForRevealedWidget.layout[screen];
      } else {
        draft.push(newLayoutForRevealedWidget);
      }
    });

    // * 3. derive editedWidgetLayout from that
    const newEditedWidgetLayout = transformLayoutsForGrid(
      newAllAWLayouts,
      !editMode,
    );

    useBoundStore.getState().setAdjustedWidgetLayouts(allAWLayouts);
    useBoundStore.getState().setEditedWidgetLayout(newEditedWidgetLayout);
  }

  rollback() {
    useBoundStore
      .getState()
      .addApparentWidget(
        this.widgetVisibility.widget,
        this.widgetVisibility.screenSize,
        !this.widgetVisibility.visible,
      );

    this._updateLayout();
  }
}
