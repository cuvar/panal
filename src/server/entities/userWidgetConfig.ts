import { isObject } from "~/utils/guards/base";
import { isLayout } from "~/utils/guards/widgets";
import type { Layout } from "~/utils/types/widget";

export class UserWidgetConfig {
  layout: Layout;

  constructor(layout: Layout) {
    this.layout = layout;
  }

  static validate(input: unknown): input is UserWidgetConfig {
    if (!isObject(input)) {
      return false;
    }
    if (!isLayout(input.layout)) {
      return false;
    }

    return true;
  }
}
