type LinkData = {
  text: string;
  href: string;
  tab: "new" | "same";
};

// data that needs to be passed to the WidgetView component -> all data for all widgets
type WidgetViewData = {
  calendarData: CalendarData[][];
};

type SearchEngineData = {
  key: "google" | "duckduckgo" | "ecosia" | "gdrive";
  displayName: string;
  url: string;
};

type CalendarData = {
  title: string;
  start: Date;
  end: Date;
  duration: number;
};

type WidgetConfig = {
  minColSpan?: number;
  minRowSpan?: number;
};
