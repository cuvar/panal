import type { ScreenSize } from "./types/types";

export const BREAKPOINTS: Readonly<Record<ScreenSize, number>> = {
  xss: 0,
  xs: 350,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export const BREAKPOINTS_ORDER: Readonly<ScreenSize[]> = Object.keys(
  BREAKPOINTS,
) as ScreenSize[];

export const BREAKPOINT_COLS: Readonly<Record<ScreenSize, number>> = {
  xss: 1,
  xs: 3,
  sm: 3,
  md: 6,
  lg: 10,
  xl: 10,
};

export const MIN_WIDGET_WIDTH = Object.freeze({
  time: 2,
  search: 2,
  links: 3,
  calendar: 2,
  default: 1,
});

export const MIN_WIDGET_HEIGHT = Object.freeze({
  time: 1,
  search: 1,
  links: 1,
  calendar: 1,
  default: 1,
});

export const GRID_ROW_HEIGHT = 100;
export const GRID_MAX_ROW = 10;

export const REPO_LAYOUT_FILE = "./store.layout.json";
export const REPO_CONFIG_FILE = "./store.config.json";

export const UPSTASH_PREFIX = "panal-";
