import { isScreenSize } from "~/utils/guards/other";
import {
  isPartialScreenSizePositioning,
  isPositioning,
  isWidgetConfig,
} from "~/utils/guards/widgets";
import type {
  PartialScreenSizePositioning,
  Positioning,
  WidgetConfig,
  WidgetData,
  WidgetType,
} from "~/utils/types/widget";
import { getMinHeightForWidget } from "./computeSizeForWidgetService";

export default function adjustLayoutValues<T extends WidgetData | WidgetConfig>(
  widgets: WidgetData[] | WidgetConfig[],
): T[] {
  if (isWidgetConfig(widgets[0])) {
    const adjustedWidgets = (widgets as WidgetConfig[]).map((widget) => {
      if (isPositioning(widget.layout)) {
        widget.layout = adjustLayout(widget.layout, widget.type);
      } else if (isPartialScreenSizePositioning(widget.layout)) {
        Object.entries(widget.layout).forEach(([key, value]) => {
          if (isScreenSize(key)) {
            (widget.layout as PartialScreenSizePositioning)[key] = adjustLayout(
              value,
              widget.type,
            );
          }
        });
      }
      return widget;
    });
    return adjustedWidgets as T[];
  } else {
    const adjustedWidgets = (widgets as WidgetData[]).map((widget) => {
      Object.entries(widget.layout).forEach(([key, value]) => {
        if (isScreenSize(key)) {
          widget.layout[key] = adjustLayout(value, widget.type);
        }
      });
      return widget;
    });
    return adjustedWidgets as T[];
  }
}

function adjustLayout(layout: Positioning, type: WidgetType): Positioning {
  if (layout.w < getMinHeightForWidget(type)) {
    layout.w = getMinHeightForWidget(type);
  }

  if (layout.h < getMinHeightForWidget(type)) {
    layout.h = getMinHeightForWidget(type);
  }
  return layout;
}
