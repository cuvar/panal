export type SearchWidgetConfig = SearchEngine[];
export type SearchWidgetData = {
  searchEngines: SearchEngine[];
};

export type SearchEngine = {
  key: "google" | "duckduckgo" | "ecosia" | "gdrive";
  displayName: string;
  url: string;
};
