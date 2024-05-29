export type ScreenSize = "xss" | "xs" | "sm" | "md" | "lg" | "xl";

export type ToastType = "error" | "success" | "info" | "warning";
export type ToastColor =
  | { bg: "bg-red-600"; text: "text-foreground" }
  | { bg: "bg-green-700"; text: "text-foreground" }
  | { bg: "bg-yellow-500"; text: "text-inverted" }
  | { bg: "bg-foreground"; text: "text-inverted" };
