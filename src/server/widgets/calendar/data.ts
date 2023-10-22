import ical from "ical";
import type { Fetcher } from "~/server/driver/Fetcher";
import {
  filterFutureEvents,
  getDatesIncludingRecurrences,
  groupCalendarWidgetByDay,
} from "~/server/service/dateManipulationService";
import type { CalendarWidgetConfig, CalendarWidgetData } from "./types";

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
  const res = await fetcher.fetch(config.url);
  const data = ical.parseICS(res);
  const calendarData = getDatesIncludingRecurrences(data, config.daysInAdvance);
  const futureDates = filterFutureEvents(calendarData, config.daysInAdvance);
  const groupedData = groupCalendarWidgetByDay(futureDates);

  return { entries: groupedData };
}
