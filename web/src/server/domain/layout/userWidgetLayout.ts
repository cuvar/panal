import { isObject } from "~/lib/guards/base";
import { isLayout, isWidgetType } from "~/lib/guards/widgets";
import type { Layout, WidgetType } from "~/lib/types/widget";

export type UserWidgetLayout = {
  layout: Layout;
  type: WidgetType;
};

export const UserWidgetLayoutHelper = {
  validate(input: unknown): input is UserWidgetLayout {
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
  },
};
