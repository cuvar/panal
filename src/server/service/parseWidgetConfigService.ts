import { isWidgetConfig } from "~/utils/guards";

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
