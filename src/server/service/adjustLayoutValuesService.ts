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

export default function adjustLayoutValues<
  T extends WidgetData | WidgetConfig | WidgetConfig[] | WidgetData[],
>(widgets: T): T {
  if (Array.isArray(widgets)) {
    if (isWidgetConfig(widgets[0])) {
      return (widgets as WidgetConfig[]).map((widget) =>
        adjustForWidgetConfig(widget),
      ) as T;
    } else {
      return (widgets as WidgetData[]).map((widget) =>
        adjustForWidgetData(widget),
      ) as T;
    }
  } else {
    if (isWidgetConfig(widgets)) {
      return adjustForWidgetConfig(widgets) as T;
    } else {
      return adjustForWidgetData(widgets) as T;
    }
  }
}

function adjustForWidgetConfig(widget: WidgetConfig): WidgetConfig {
  if (isPositioning(widget.layout)) {
    widget.layout = adjustBoundsForMinValues(widget.layout, widget.type);
  } else if (isPartialScreenSizePositioning(widget.layout)) {
    Object.entries(widget.layout).forEach(([key, value]) => {
      if (isScreenSize(key)) {
        (widget.layout as PartialScreenSizePositioning)[key] =
          adjustBoundsForMinValues(value, widget.type);
      }
    });
  }
  return widget;
}

function adjustForWidgetData(widget: WidgetData): WidgetData {
  Object.entries(widget.layout).forEach(([key, value]) => {
    if (isScreenSize(key)) {
      widget.layout[key] = adjustBoundsForMinValues(value, widget.type);
    }
  });
  return widget;
}

function adjustBoundsForMinValues(
  layout: Positioning,
  type: WidgetType,
): Positioning {
  if (layout.w < getMinHeightForWidget(type)) {
    layout.w = getMinHeightForWidget(type);
  }

  if (layout.h < getMinHeightForWidget(type)) {
    layout.h = getMinHeightForWidget(type);
  }
  return layout;
}
