import type { CalendarComponent, FullCalendar } from "ical";
import type { CalendarEntry } from "../widgets/calendar/types";

/**
 * Filters future events with a given `days` in advance.
 * @param calendarData All data of calendar unfiltered
 * @param days Days in advance
 * @returns Filtered calendar data
 */
export function filterFutureEvents(
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

/**
 * Groups calendar data by day.
 * @param data All events from the calendar
 * @returns Grouped calendar data by day
 */
export function groupCalendarWidgetByDay(
  data: CalendarEntry[],
): CalendarEntry[][] {
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

/**
 * Returns all dates with or without a recurrence.
 * @param data Parsed data from ical.parseICS
 * @param daysInAdvance Days in advance that should be included
 * @returns
 */
export function getDatesIncludingRecurrences(
  data: FullCalendar,
  daysInAdvance: number,
): CalendarEntry[] {
  const datesWithRecurrences: CalendarEntry[] = [];

  const rangeStart = new Date(); // today
  const todayPlusNDays = new Date().setDate(
    rangeStart.getDate() + daysInAdvance,
  );
  const rangeEnd = new Date(todayPlusNDays);

  const events = filterValidEvents(data);
  datesWithRecurrences.push(...getNonRecurringEvents(events));

  const recurringEvents = getRecurringEvents(events);
  for (const event of recurringEvents) {
    const dates = event.rrule!.between(rangeStart, rangeEnd, true, () => true);
    // The "dates" array contains the set of dates within our desired date range that are valid
    // for the recurrence rule.  *However*, it's possible for us to have a specific recurrence that
    // had its date changed from outside the range to inside the range. One way to handle this is
    // to add *all* recurrence override entries into the set of dates that we check, and then later
    // filter out any recurrences that don't actually belong within our range.

    const inRange = filterInRangeRecurrences(event, rangeStart, rangeEnd);
    dates.push(...inRange);

    for (const date of dates) {
      const result = getValidRecurrenceEvent(event, date, rangeStart, rangeEnd);
      if (result) {
        datesWithRecurrences.push(result);
      }
    }
  }

  return datesWithRecurrences;
}
/**
 * Filters all events that are valid for the following calculations
 * @param data Parsed data from ical.parseICS
 * @returns List of valid events
 */
export function filterValidEvents(data: FullCalendar) {
  const events = [];
  for (const k in data) {
    const event = data[k];
    if (typeof event === "undefined") continue;
    if (typeof event.start === "undefined") continue;
    if (typeof event.end === "undefined") continue;
    if (event.type !== "VEVENT") continue;
    events.push(event);
  }

  return events;
}

/**
 * Gets all events that do not have a recurrence rule.
 * @param events List of valid events
 * @returns List of events without a recurrence rule
 */
export function getNonRecurringEvents(events: CalendarComponent[]) {
  const nonRecurringEvents = events.filter(
    (event) =>
      typeof event.rrule === "undefined" || typeof event.rrule === "string",
  );
  const entries = nonRecurringEvents.map((event) => {
    const startDate = new Date(event.start!);
    const endDate = new Date(event.end!);
    const duration = endDate.getTime() - startDate.getTime();

    const newEvent: CalendarEntry = {
      title: typeof event.summary !== "string" ? "*No data*" : event.summary,
      start: startDate,
      end: endDate,
      duration: duration,
    };
    return newEvent;
  });

  return entries;
}

/**
 * Gets all events that have a recurrence rule.
 * @param events List of valid events
 * @returns List of events with a recurrence rule
 */
export function getRecurringEvents(events: CalendarComponent[]) {
  return events.filter(
    (event) =>
      !(typeof event.rrule === "undefined" || typeof event.rrule === "string"),
  );
}

/**
 * Filters all recurrences that are in date range.
 * @param event Event with recurrences
 * @param rangeStart Start of the range
 * @param rangeEnd End of the range
 * @returns List of recurrences in date range
 */
export function filterInRangeRecurrences(
  event: CalendarComponent,
  rangeStart: Date,
  rangeEnd: Date,
) {
  const dates: Date[] = [];
  if (event.recurrences == undefined) {
    return [];
  }

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

  return dates;
}

/**
 * Gets the recurrence event for a given event if valid.
 * @param event The given event
 * @param date
 * @param rangeStart Start of range
 * @param rangeEnd End of range
 * @returns List of valid recurrence
 */
export function getValidRecurrenceEvent(
  event: CalendarComponent,
  date: Date,
  rangeStart: Date,
  rangeEnd: Date,
) {
  let curEvent = event;
  let curDuration =
    new Date(event.start!).getTime() - new Date(event.end!).getTime();
  let startDate = date;
  let showRecurrence = true;
  const dateLookupKey = date.toISOString().substring(0, 10);

  // * CHECK FOR RECURRENCE OVERRIDE *
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
      return null;
    }

    const a = curEvent.recurrences[dateLookupKey];
    if (a === undefined) return null;
    curEvent = a;
    if (typeof curEvent.start === "undefined") return null;
    if (typeof curEvent.end === "undefined") return null;

    startDate = new Date(curEvent.start);
    curDuration = new Date(curEvent.end).getTime() - startDate.getTime();
  }

  // If there's no recurrence override, check for an exception date. Exception dates represent exceptions to the rule.
  else if (curEvent.exdate?.[dateLookupKey] != undefined) {
    // This date is an exception date, which means we should skip it in the recurrence pattern.
    showRecurrence = false;
  }

  const endDate = new Date(startDate.getTime() + curDuration);
  if (endDate <= rangeStart || startDate >= rangeEnd) showRecurrence = false;
  if (!showRecurrence) return null;

  const newEvent: CalendarEntry = {
    title: curEvent.summary ?? "*No data*",
    start: startDate,
    end: endDate,
    duration: curDuration,
  };
  return newEvent;
}
