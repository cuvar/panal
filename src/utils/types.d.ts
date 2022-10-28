interface LinkData {
  text: string;
  href: string;
  tab: "new" | "same";
}

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
  start: string;
  end: string;
}
