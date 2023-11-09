import ical from "ical";
import type { Fetcher } from "~/server/driver/Fetcher/Fetcher";
import {
  filterFutureEvents,
  getDatesIncludingRecurrences,
  groupCalendarWidgetByDay,
  sortCalendarEntries,
} from "~/server/service/dateManipulationService";
import Log from "~/utils/log";
import type {
  CalendarEntry,
  CalendarWidgetConfig,
  CalendarWidgetData,
} from "./types";

/**
 * Compute data for link widget
 * @param {CalendarWidgetConfig} config Config for link widget
 * @param {Fetcher} fetcher Fetcher for ICS file
 * @returns {CalendarWidgetData} Data for link widget
 */
export default async function computeCalendarWidgetData(
  config: CalendarWidgetConfig,
  fetcher: Fetcher,
): Promise<CalendarWidgetData> {
  try {
    const icsResults: Promise<CalendarEntry[]>[] = config.map(async (conf) => {
      const res = await fetcher.fetch(conf.url);
      const data = ical.parseICS(res);
      const calendarData = getDatesIncludingRecurrences(
        data,
        conf.daysInAdvance,
        conf.color,
      );
      const futureDates = filterFutureEvents(calendarData, conf.daysInAdvance);
      return futureDates;
    });

    const promises = await Promise.all(icsResults);

    const calendarData = promises.reduce((prev, cur) => {
      prev = prev.concat(cur);
      return prev;
    });

    const sorted = sortCalendarEntries(calendarData);
    const groupedData = groupCalendarWidgetByDay(sorted);

    return { entries: groupedData };
  } catch (error) {
    Log(error, "error");
    return { entries: [] };
  }
}
