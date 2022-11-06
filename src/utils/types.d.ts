interface LinkData {
  text: string;
  href: string;
  tab: "new" | "same";
}

// data that needs to be passed to the WidgetView component -> all data for all widgets
interface WidgetViewData {
  calendarData: CalendarData[][];
}

interface SearchEngineData {
  key: "google" | "duckduckgo" | "ecosia" | "gdrive";
  displayName: string;
  url: string;
}

interface CalendarData {
  title: string;
  start: Date;
  end: Date;
  duration: number;
}

interface WidgetConfig {
  minColSpan?: number;
  minRowSpan?: number;
}
