import { isAdjustedWidgetConfig, isWidgetConfig } from "~/utils/guards/widgets";
import type { AdjustedWidgetConfig, WidgetConfig } from "~/utils/types/widget";

// todo: write tests
export default function parseWidgetConfig(
  input: string,
): WidgetConfig[] | null {
  const parsed = JSON.parse(input);
  if (!Array.isArray(parsed)) {
    return null;
  }
  const result: WidgetConfig[] = [];
  for (const widget of parsed) {
    if (!isWidgetConfig(widget)) {
      return null;
    }
    result.push(widget);
  }
  return result;
}

export function parseAdjustedWidgetConfig(
  input: string,
): AdjustedWidgetConfig[] | null {
  const parsed = JSON.parse(input);
  if (!Array.isArray(parsed)) {
    return null;
  }

  const result: AdjustedWidgetConfig[] = [];
  for (const widget of parsed) {
    if (!isAdjustedWidgetConfig(widget)) {
      return null;
    }
    result.push(widget);
  }
  return result;
}
