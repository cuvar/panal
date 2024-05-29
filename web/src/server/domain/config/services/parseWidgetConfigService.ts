import { AdjustedWidgetLayout } from "../../layout/adjustedWidgetLayout";
import { UserWidgetLayout } from "../../layout/userWidgetLayout";
import { WidgetConfig } from "../widgetConfig";

/**
 * Parses a string into a UserWidgetLayout[].
 * @param {string} input String to parse
 * @returns {UserWidgetLayout[] | null} Parsed UserWidgetLayout[] or null if invalid
 */
export default function parseUserWidgetLayout(
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
    result.push(new UserWidgetLayout(widget.type, widget.layout));
  }
  return result;
}

/**
 * Parses a string into a AdjustedWidgetLayout[].
 * @param {string} input String to parse
 * @returns {AdjustedWidgetLayout[] | null} Parsed AdjustedWidgetLayout[] or null if invalid
 */
export function parseAdjustedWidgetLayout(
  input: string,
): AdjustedWidgetLayout[] | null {
  const parsed = JSON.parse(input);
  if (!Array.isArray(parsed)) {
    return null;
  }

  const result: AdjustedWidgetLayout[] = [];
  for (const widget of parsed) {
    if (!AdjustedWidgetLayout.validate(widget)) {
      return null;
    }
    result.push(
      new AdjustedWidgetLayout(widget.id, widget.type, widget.layout),
    );
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
