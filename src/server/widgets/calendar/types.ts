export type CalendarWidgetConfig = {
  url: string;
  daysInAdvance: number;
  color: string;
};

export type CalendarWidgetData = {
  entries: CalendarEntry[][];
  color: string;
};

export type CalendarEntry = {
  title: string;
  start: Date;
  end: Date;
  duration: number;
};
