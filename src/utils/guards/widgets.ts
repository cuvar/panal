import { isNumber, isObject } from "./base";
import { isLinkWidgetConfig } from "~/server/widgets/links/guards";
import { isSearchWidgetConfig } from "~/server/widgets/search/guards";
import { isCalendarWidgetConfig } from "~/server/widgets/calendar/guards";
import { isTimeWidgetConfig } from "~/server/widgets/time/guards";
import type {
  Layout,
  PartialScreenSizePositioning,
  Positioning,
  ScreenSizePositioning,
  WidgetConfig,
  WidgetType,
} from "../types/widget";
import { isScreenSize } from "./other";
import { BREAKPOINTS_ORDER } from "../const";

export function isWidgetConfig(input: unknown): input is WidgetConfig {
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

export function isFittingDataPaylod(
  data: unknown,
  type: WidgetType,
): data is WidgetConfig["data"] {
  switch (type) {
    case "calendar":
      return isCalendarWidgetConfig(data);
    case "search":
      return isSearchWidgetConfig(data);
    case "links":
      return isLinkWidgetConfig(data);
    case "time":
      return isTimeWidgetConfig(data);
    default:
      return false;
  }
}

export function isWidgetType(type: unknown): type is WidgetType {
  return (
    type === "calendar" ||
    type === "search" ||
    type === "links" ||
    type === "time"
  );
}

export function isLayout(layout: unknown): layout is Layout {
  if (!isObject(layout)) {
    return false;
  }

  if (isPositioning(layout)) {
    return true;
  }

  let foundIssue = false;
  Object.entries(layout).forEach(([key, value]) => {
    if (!isScreenSize(key)) {
      foundIssue = true;
    }
    if (!isPositioning(value)) {
      foundIssue = true;
    }
  });
  if (foundIssue) return false;
  return true;
}

export function isPositioning(
  positioning: unknown,
): positioning is Positioning {
  if (!isObject(positioning)) {
    return false;
  }
  if (!isNumber(positioning.x)) {
    return false;
  }
  if (!isNumber(positioning.y)) {
    return false;
  }
  if (!isNumber(positioning.w)) {
    return false;
  }
  if (!isNumber(positioning.h)) {
    return false;
  }
  return true;
}

export function isPartialScreenSizePositioning(
  data: unknown,
): data is PartialScreenSizePositioning {
  if (!isObject(data)) {
    return false;
  }

  let foundIssue = false;
  Object.entries(data).forEach(([key, value]) => {
    if (!isScreenSize(key)) {
      foundIssue = true;
    }
    if (!isPositioning(value)) {
      foundIssue = true;
    }
  });
  if (foundIssue) return false;
  return true;
}

export function isScreenSizePositioning(
  data: unknown,
): data is ScreenSizePositioning {
  if (!isObject(data)) {
    return false;
  }
  if (Object.entries(data).length !== BREAKPOINTS_ORDER.length) {
    // not all screen sizes are present
    return false;
  }

  let foundIssue = false;
  Object.entries(data).forEach(([key, value]) => {
    if (!isScreenSize(key)) {
      foundIssue = true;
    }
    if (!isPositioning(value)) {
      foundIssue = true;
    }
  });
  if (foundIssue) return false;

  return true;
}
