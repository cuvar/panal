interface LinkData {
  text: string;
  href: string;
  tab: "new" | "same";
}

interface WidgetViewData {
  calendarData: {};
}

interface SearchEngineData {
  key: "google" | "duckduckgo" | "ecosia" | "gdrive";
  displayName: string;
  url: string;
}

interface CalendarData {}
