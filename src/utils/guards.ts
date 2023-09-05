export function isObject(data: unknown): data is Record<string, string> {
  return typeof data === "object" && data !== null;
}

export function isString(data: unknown): data is string {
  return typeof data === "string";
}

export function isNumber(data: unknown): data is number {
  return typeof data === "number";
}
