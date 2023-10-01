import type { WidgetType } from "~/utils/types/widget";

// todo: write tests
export function getMinWidthForWidget(widgetType: WidgetType): number {
  switch (widgetType) {
    case "time":
      return 2;
    case "search":
      return 2;
    case "links":
      return 4;
    case "calendar":
      return 2;
    default:
      return 1;
  }
}

export function getMinHeightForWidget(widgetType: WidgetType): number {
  switch (widgetType) {
    case "time":
      return 1;
    case "search":
      return 1;
    case "links":
      return 1;
    case "calendar":
      return 2;
    default:
      return 1;
  }
}
