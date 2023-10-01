import ical from "ical";
import type { FullCalendar } from "ical";
import type {
  CalendarEntry,
  CalendarWidgetConfig,
  CalendarWidgetData,
} from "./types";

export const DAYS = 7;

export default async function computeCalendarWidgetData(
  config: CalendarWidgetConfig,
): Promise<CalendarWidgetData> {
  let res = null;
  try {
    res = await fetch(config.url).then((res) => res.text());
  } catch (error) {
    console.log(error);
    throw error;
  }

  const data = ical.parseICS(res);
  const calendarData = getDatesWithRecurrences(data, config.daysInAdvance);
  const futureDates = filterFutureEvents(calendarData, config.daysInAdvance);
  const groupedData = groupCalendarWidgetByDay(futureDates);

  return { entries: groupedData };
}

/**
 * filters future events with a given `days` in advance
 * @param calendarData all data of calendar unfiltered
 * @param days days in advance
 * @returns filtered calendar data
 */
function filterFutureEvents(
  calendarData: CalendarEntry[],
  days: number,
): CalendarEntry[] {
  calendarData.sort((a, b) => {
    return a.start.getTime() - new Date(b.start).getTime();
  });

  const todayPlusNDays = new Date();
  todayPlusNDays.setDate(new Date().getDate() + days);

  // filter only next `DAYS` days

  const futureDates = calendarData.filter((item) => {
    // const thisDate = new Date().toISOString().split("T")[0];
    const now = new Date().getTime();
    return (
      (item.start.getTime() >= now &&
        item.start.getTime() < todayPlusNDays.getTime()) || // following events
      (item.start.getTime() <= now && item.end.getTime() >= now) // currently running event
    );
  });

  return futureDates;
}

function getDatesWithRecurrences(
  data: FullCalendar,
  daysInAdvance: number,
): CalendarEntry[] {
  const datesWithRecurrences: CalendarEntry[] = [];

  for (const k in data) {
    const rangeStart = new Date(); // today
    const todayPlusNDays = new Date().setDate(
      rangeStart.getDate() + daysInAdvance,
    );
    const rangeEnd = new Date(todayPlusNDays);

    const event = data[k];

    if (typeof event === "undefined") continue;
    if (typeof event.start === "undefined") continue;
    if (typeof event.end === "undefined") continue;

    if (event.type !== "VEVENT") continue;

    const title = event.summary;
    let startDate = new Date(event.start);
    let endDate = new Date(event.end);

    const duration = endDate.getTime() - startDate.getTime();

    if (typeof event.rrule === "undefined") {
      const newEvent: CalendarEntry = {
        title: title ?? "*No data*",
        start: startDate,
        end: endDate,
        duration: duration,
      };
      datesWithRecurrences.push(newEvent);
      continue;
    }

    const dates = event.rrule.between(rangeStart, rangeEnd, true, () => true);

    // The "dates" array contains the set of dates within our desired date range range that are valid
    // for the recurrence rule.  *However*, it's possible for us to have a specific recurrence that
    // had its date changed from outside the range to inside the range.  One way to handle this is
    // to add *all* recurrence override entries into the set of dates that we check, and then later
    // filter out any recurrences that don't actually belong within our range.
    if (event.recurrences != undefined) {
      for (const r of event.recurrences) {
        // Only add dates that weren't already in the range we added from the rrule so that
        // we don't double-add those events.

        // check if date r is in range
        if (!r.start || r.dtstamp) continue;
        const date = new Date(r.start ?? r.dtstamp);
        if (date >= rangeStart && date <= rangeEnd) {
          dates.push(date);
        }
      }
    }

    for (const date of dates) {
      let curEvent = event;
      let showRecurrence = true;
      let curDuration = duration;

      startDate = date;
      const dateLookupKey = date.toISOString().substring(0, 10);

      // For each date that we're checking, it's possible that there is a recurrence override for that one day.
      if (
        typeof dateLookupKey == "number" &&
        curEvent.recurrences?.[dateLookupKey] != undefined
      ) {
        // We found an override, so for this recurrence, use a potentially different title, start date, and duration.
        if (
          typeof curEvent.recurrences[dateLookupKey] == "undefined" ||
          !curEvent.recurrences[dateLookupKey]
        ) {
          continue;
        }

        const a = curEvent.recurrences[dateLookupKey];
        if (a === undefined) continue;

        curEvent = a;
        if (typeof curEvent.start === "undefined") continue;
        if (typeof curEvent.end === "undefined") continue;

        startDate = new Date(curEvent.start);
        curDuration = new Date(curEvent.end).getTime() - startDate.getTime();
      }
      // If there's no recurrence override, check for an exception date. Exception dates represent exceptions to the rule.
      else if (curEvent.exdate?.[dateLookupKey] != undefined) {
        // This date is an exception date, which means we should skip it in the recurrence pattern.
        showRecurrence = false;
      }

      const recurrenceTitle = curEvent.summary;
      endDate = new Date(startDate.getTime() + curDuration);

      if (endDate <= rangeStart || startDate >= rangeEnd) {
        showRecurrence = false;
      }

      if (showRecurrence === true) {
        const newEvent: CalendarEntry = {
          title: recurrenceTitle ?? "*No data*",
          start: startDate,
          end: endDate,
          duration: curDuration,
        };

        datesWithRecurrences.push(newEvent);
      }
    }
  }

  return datesWithRecurrences;
}

/**
 * groups calendar data by day
 * @param data all events from the calendar
 * @returns grouped calendar data by day
 */
function groupCalendarWidgetByDay(data: CalendarEntry[]): CalendarEntry[][] {
  const grouped: CalendarEntry[][] = [];

  const days = new Set(
    data.map((item) => {
      return item.start.toDateString();
    }),
  );

  days.forEach((day) => {
    const dayData = data.filter((item) => item.start.toDateString() === day);
    grouped.push(dayData);
  });

  return grouped;
}
