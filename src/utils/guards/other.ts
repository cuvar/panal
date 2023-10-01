export function isScreenSize(screenSize: unknown): screenSize is ScreenSize {
  return (
    screenSize === "xss" ||
    screenSize === "xs" ||
    screenSize === "sm" ||
    screenSize === "md" ||
    screenSize === "lg" ||
    screenSize === "xl"
  );
}
