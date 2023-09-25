// general
type WidgetType = "calendar" | "search" | "links" | "time";

type Positioning = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type Layout = Positioning | Record<ScreenSize, Positioning>;

type WidgetConfig = {
  type: WidgetType;
  layout: Layout;
};

// data that needs to be passed to the WidgetView component -> all data for all widgets
type WidgetViewData = {
  calendarData: CalendarWidget[][];
};

type LinkWidget = {
  text: string;
  href: string;
  tab: "new" | "same";
};

type SearchEngineWidget = {
  key: "google" | "duckduckgo" | "ecosia" | "gdrive";
  displayName: string;
  url: string;
};

type CalendarWidget = {
  title: string;
  start: Date;
  end: Date;
  duration: number;
};
