export type CalendarWidgetConfig = {
  url: string;
  daysInAdvance: number;
};

export type CalendarWidgetData = {
  entries: CalendarEntry[][];
};

export type CalendarEntry = {
  title: string;
  start: Date;
  end: Date;
  duration: number;
};
