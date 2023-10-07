import { isObject } from "~/utils/guards/base";
import {
  isFittingDataPaylod,
  isLayout,
  isWidgetType,
} from "~/utils/guards/widgets";
import type { Layout, WidgetType } from "~/utils/types/widget";
import type { CalendarWidgetConfig } from "../widgets/calendar/types";
import type { LinkWidgetConfig } from "../widgets/links/types";
import type { SearchWidgetConfig } from "../widgets/search/types";
import type { TimeWidgetConfig } from "../widgets/time/types";

export class UserWidgetConfig {
  type: WidgetType;
  layout: Layout;
  data:
    | LinkWidgetConfig
    | SearchWidgetConfig
    | CalendarWidgetConfig
    | TimeWidgetConfig;

  constructor(
    type: WidgetType,
    layout: Layout,
    data:
      | LinkWidgetConfig
      | SearchWidgetConfig
      | CalendarWidgetConfig
      | TimeWidgetConfig,
  ) {
    this.type = type;
    this.layout = layout;
    this.data = data;
  }

  static validate(input: unknown): input is UserWidgetConfig {
    if (!isObject(input)) {
      return false;
    }
    if (!isWidgetType(input.type)) {
      return false;
    }
    if (!isLayout(input.layout)) {
      return false;
    }
    if (!isFittingDataPaylod(input.data, input.type)) {
      return false;
    }

    return true;
  }
}
