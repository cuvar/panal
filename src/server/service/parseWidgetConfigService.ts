import { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
import { UserWidgetLayout } from "../entities/userWidgetConfig";
import { WidgetConfig } from "../entities/widgetConfig";

/**
 * Parses a string into a UserWidgetLayout[].
 * @param {string} input String to parse
 * @returns {UserWidgetLayout[] | null} Parsed UserWidgetLayout[] or null if invalid
 */
export default function parseUserWidgetConfig(
  input: string,
): UserWidgetLayout[] | null {
  const parsed = JSON.parse(input);
  if (!Array.isArray(parsed)) {
    return null;
  }
  const result: UserWidgetLayout[] = [];
  for (const widget of parsed) {
    if (!UserWidgetLayout.validate(widget)) {
      return null;
    }
    result.push(new UserWidgetLayout(widget.layout));
  }
  return result;
}

/**
 * Parses a string into a AdjustedWidgetConfig[].
 * @param {string} input String to parse
 * @returns {AdjustedWidgetConfig[] | null} Parsed AdjustedWidgetConfig[] or null if invalid
 */
export function parseAdjustedWidgetConfig(
  input: string,
): AdjustedWidgetConfig[] | null {
  const parsed = JSON.parse(input);
  if (!Array.isArray(parsed)) {
    return null;
  }

  const result: AdjustedWidgetConfig[] = [];
  for (const widget of parsed) {
    if (!AdjustedWidgetConfig.validate(widget)) {
      return null;
    }
    result.push(new AdjustedWidgetConfig(widget.id, widget.layout));
  }
  return result;
}

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
    if (!WidgetConfig.validate(widget)) {
      return null;
    }
    result.push(new WidgetConfig(widget.id, widget.type, widget.data));
  }
  return result;
}
