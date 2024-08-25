import { produce } from "immer";
import { calcNewWidgetLayout } from "~/application/client/calcNewWidgetLayout.service";
import { type ScreenSize } from "~/lib/types/types";
import {
  type Positioning,
  type ScreenSizePositioning,
} from "~/lib/types/widget";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import {
  awlToRgl,
  rglToAwl,
  withMinValues,
} from "~/server/domain/layout/services/transform.service";
import { type WidgetVisibility } from "~/server/domain/layout/widgetVisibility";
import { useBoundStore } from "../state";
import { type Command } from "./command";

/**
 * is triggered, when a widget is revealed in edit mode
 */
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
    const layoutTypes = useBoundStore.getState().layoutTypes;

    if (!editMode || !editedWidgetLayout[this.widgetVisibility.screenSize]) {
      return;
    }

    const allPositionings =
      editedWidgetLayout[this.widgetVisibility.screenSize] ?? [];

    // * 1. get new layout for added widget
    const newLayoutForRevealedWidget = produce(
      this.widgetVisibility,
      (draft) => {
        draft.widget = calcNewWidgetLayout(draft, allPositionings);
        draft.widget = {
          id: draft.widget.id,
          type: draft.widget.type,
          layout: draft.widget.layout,
        } as AdjustedWidgetLayout;
        const layout = draft.widget.layout;
        const hasMinValues = {};
        Object.entries(layout).forEach(([screen, value]) => {
          const newPositioning = withMinValues<Positioning>(
            value,
            draft.widget.type,
          );
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          hasMinValues[screen] = newPositioning;
        });
        draft.widget.layout = hasMinValues as ScreenSizePositioning;
      },
    ).widget;

    // * 2. update adjustedWidgetLayout
    const newAwlLayout = rglToAwl(editedWidgetLayout, layoutTypes);

    const newAllAWLayouts = produce(newAwlLayout, (draft) => {
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
    const newEditedWidgetLayout = awlToRgl(newAllAWLayouts, !editMode);

    useBoundStore.getState().setAdjustedWidgetLayouts(newAwlLayout);
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
