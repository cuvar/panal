export function isScreenSize(screenSize: unknown): screenSize is ScreenSize {
  return (
    screenSize === "xs" ||
    screenSize === "sm" ||
    screenSize === "md" ||
    screenSize === "lg" ||
    screenSize === "xl"
  );
}
