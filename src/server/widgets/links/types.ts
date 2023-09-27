export type LinkWidgetConfig = LinkWidgetLink[];

export type LinkWidgetData = LinkWidgetLink[];

export type LinkWidgetLink = {
  text: string;
  href: string;
  tab: "new" | "same";
};
