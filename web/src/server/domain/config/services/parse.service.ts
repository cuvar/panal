import { type WidgetConfig, WidgetConfigHelper } from "../widgetConfig";

/**
 * Parses a string into a WidgetConfig[].
 * @param {string} input String to parse
 * @returns {WidgetConfig[] | null} Parsed WidgetConfig[] or null if invalid
 */
export function parseWidgetConfigArray(input: string): WidgetConfig[] | null {
  const parsed = JSON.parse(input);
  if (!Array.isArray(parsed)) {
    return null;
  }

  const result: WidgetConfig[] = [];
  for (const widget of parsed) {
    if (!WidgetConfigHelper.validate(widget)) {
      return null;
    }
    result.push({
      id: widget.id,
      type: widget.type,
      data: widget.data,
    } as WidgetConfig);
  }
  return result;
}
