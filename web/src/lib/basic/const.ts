import { type WidgetType } from "~/server/domain/config/widgetType";
import { type ScreenSize } from "~/server/domain/other/screenSize";
import { type Positioning } from "~/server/domain/positioning/positioning";

export const APP_NAME = "panal";

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
  time: {
    xss: 2,
    xs: 2,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2,
  },
  search: {
    xss: 2,
    xs: 2,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2,
  },
  links: {
    xss: 1,
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
  },
  calendar: {
    xss: 2,
    xs: 2,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2,
  },
  default: {
    xss: 1,
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
  },
} satisfies Record<WidgetType | "default", Record<ScreenSize, number>>);

export const MIN_WIDGET_HEIGHT = Object.freeze({
  time: {
    xss: 1,
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
  },
  search: {
    xss: 1,
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
  },
  links: {
    xss: 1,
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
  },
  calendar: {
    xss: 1,
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
  },
  default: {
    xss: 1,
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
  },
} satisfies Record<WidgetType | "default", Record<ScreenSize, number>>);

export const GRID_ROW_HEIGHT = 100;
export const GRID_MAX_ROW = 10;

export const REPO_LAYOUT_FILE = "./store.layout.json";
export const REPO_CONFIG_FILE = "./store.config.json";

export const UPSTASH_PREFIX = "panal-";
export const UPSTASH_WIDGET_PREFIX = "widget-";
export const UPSTASH_LAYOUT_KEY = UPSTASH_PREFIX + "widgets-layout";

export const HIDDEN_POSITIONING: Positioning = { x: 0, y: 0, w: 0, h: 0 };
