import { isObject } from "~/lib/guards/base";
import {
  WidgetTypeHelper,
  type WidgetType,
} from "~/server/domain/config/widgetType";
import { LayoutHelper, type Layout } from "./layout";

export type UserWidgetLayout = {
  layout: Layout;
  type: WidgetType;
};

export const UserWidgetLayoutHelper = {
  validate(input: unknown): input is UserWidgetLayout {
    if (!isObject(input)) {
      return false;
    }

    if (!WidgetTypeHelper.validate(input.type)) {
      return false;
    }

    if (!LayoutHelper.validate(input.layout)) {
      return false;
    }

    return true;
  },
};
