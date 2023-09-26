export function isObject(data: unknown): data is Record<string, string> {
  return typeof data === "object" && data !== null;
}

export function isString(data: unknown): data is string {
  return typeof data === "string";
}

export function isNumber(data: unknown): data is number {
  return typeof data === "number";
}

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
  return true;
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

  Object.entries(layout).forEach(([key, value]) => {
    if (!isScreenSize(key)) {
      return false;
    }
    if (!isPositioning(value)) {
      return false;
    }
  });
  return true;
}

export function isScreenSize(screenSize: unknown): screenSize is ScreenSize {
  return (
    screenSize === "xs" ||
    screenSize === "sm" ||
    screenSize === "md" ||
    screenSize === "lg" ||
    screenSize === "xl"
  );
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
