import {
  type AdjustedWidgetLayout,
  AdjustedWidgetLayoutHelper,
} from "../../layout/adjustedWidgetLayout";
import {
  type UserWidgetLayout,
  UserWidgetLayoutHelper,
} from "../../layout/userWidgetLayout";

/**
 * Parses a string into a UserWidgetLayout[].
 * @param {string} input String to parse
 * @returns {UserWidgetLayout[] | null} Parsed UserWidgetLayout[] or null if invalid
 */
export function parseUserWidgetLayout(
  input: string,
): UserWidgetLayout[] | null {
  const parsed = JSON.parse(input);
  if (!Array.isArray(parsed)) {
    return null;
  }
  const result: UserWidgetLayout[] = [];
  for (const widget of parsed) {
    if (!UserWidgetLayoutHelper.validate(widget)) {
      return null;
    }
    result.push({
      type: widget.type,
      layout: widget.layout,
    } as UserWidgetLayout);
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
    if (!AdjustedWidgetLayoutHelper.validate(widget)) {
      return null;
    }
    result.push({
      id: widget.id,
      type: widget.type,
      layout: widget.layout,
    } as AdjustedWidgetLayout);
  }
  return result;
}
