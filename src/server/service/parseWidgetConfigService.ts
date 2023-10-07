import { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
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
    result.push(new UserWidgetConfig(widget.type, widget.layout, widget.data));
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
    if (!AdjustedWidgetConfig.validate(widget)) {
      return null;
    }
    result.push(
      new AdjustedWidgetConfig(
        widget.id,
        widget.type,
        widget.layout,
        widget.data,
      ),
    );
  }
  return result;
}
