import { isObject } from "~/utils/guards/base";
import type { TimeWidgetConfig, TimeWidgetData } from "./types";

export function isTimeWidgetConfig(data: unknown): data is TimeWidgetConfig {
  if (!isObject(data)) {
    return false;
  }
  return true;
}

export function isTimeWidgetData(data: unknown): data is TimeWidgetData {
  if (!isObject(data)) {
    return false;
  }
  return true;
}
