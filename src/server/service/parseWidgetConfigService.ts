import { isAdjustedWidgetConfig } from "~/utils/guards/widgets";
import type { AdjustedWidgetConfig } from "~/utils/types/widget";
import { UserWidgetConfig } from "../entities/userWidgetConfig";

// todo: write tests
export default function parseWidgetConfig(
  input: string,
): UserWidgetConfig[] | null {
  const parsed = JSON.parse(input);
  if (!Array.isArray(parsed)) {
    return null;
  }
  const result: UserWidgetConfig[] = [];
  for (const widget of parsed) {
    if (!UserWidgetConfig.validate(widget)) {
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
