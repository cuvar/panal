export type ScreenSize = "xss" | "xs" | "sm" | "md" | "lg" | "xl";

export type ToastType = "error" | "success" | "info" | "warning";
export type ToastColor =
  | { bg: "bg-red-600"; text: "text-white" }
  | { bg: "bg-green-700"; text: "text-white" }
  | { bg: "bg-yellow-500"; text: "text-black" }
  | { bg: "bg-gray-200"; text: "text-black" };
