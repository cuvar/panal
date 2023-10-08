import ical from "ical";
import { env } from "~/env.mjs";
import {
  filterFutureEvents,
  getDatesIncludingRecurrences,
  groupCalendarWidgetByDay,
} from "~/server/service/dateManipulationService";
import type { CalendarWidgetConfig, CalendarWidgetData } from "./types";

export default async function computeCalendarWidgetData(
  config: CalendarWidgetConfig,
): Promise<CalendarWidgetData> {
  let res = null;
  try {
    res = await fetch(config.url).then((res) => res.text());
  } catch (error) {
    if (env.NEXT_PUBLIC_PANAL_DEBUG == "false") {
      console.log(error);
    }
    throw error;
  }

  const data = ical.parseICS(res);
  const calendarData = getDatesIncludingRecurrences(data, config.daysInAdvance);
  const futureDates = filterFutureEvents(calendarData, config.daysInAdvance);
  const groupedData = groupCalendarWidgetByDay(futureDates);

  return { entries: groupedData };
}
