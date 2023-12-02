import { isObject } from "~/utils/guards/base";
import { isLayout, isWidgetType } from "~/utils/guards/widgets";
import type { Layout, WidgetType } from "~/utils/types/widget";

export class UserWidgetLayout {
  layout: Layout;
  type: WidgetType;

  constructor(type: WidgetType, layout: Layout) {
    this.type = type;
    this.layout = layout;
  }

  static validate(input: unknown): input is UserWidgetLayout {
    if (!isObject(input)) {
      return false;
    }

    if (!isWidgetType(input.type)) {
      return false;
    }

    if (!isLayout(input.layout)) {
      return false;
    }

    return true;
  }
}
