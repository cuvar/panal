export type CalendarWidgetConfig = CalendarWidgetConfigItem[];
export type CalendarWidgetConfigItem = {
  url: string;
  daysInAdvance: number;
  color: string;
};

export type CalendarWidgetData = {
  entries: CalendarEntry[][];
};

export type CalendarEntry = {
  title: string;
  start: Date;
  end: Date;
  duration: number;
  color: string;
};
