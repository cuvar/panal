export const BREAKPOINTS: Readonly<Record<ScreenSize, number>> = {
  xss: 0,
  xs: 350,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export const BREAKPOINTS_ORDER = Object.keys(BREAKPOINTS) as ScreenSize[];

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
