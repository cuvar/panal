export type LinkWidgetConfig = {
  title?: string;
  links: LinkWidgetLink[];
};

export type LinkWidgetData = {
  title?: string;
  links: LinkWidgetLink[];
};

export type LinkWidgetLink = {
  text: string;
  href: string;
  tab: "new" | "same";
};
