import type { CalendarComponent, FullCalendar } from "ical";
import type { CalendarEntry } from "../types";
import {
  filterInRangeRecurrences,
  getNonRecurringEvents,
  getRecurringEvents,
  getValidRecurrenceEvent,
} from "./recurrence.service";

/**
 * Filters future events with a given `days` in advance.
 * @param {CalendarEntry[]} calendarData All data of calendar unfiltered
 * @param {number} days Days in advance
 * @returns {CalendarEntry[]} Filtered calendar data
 */
export function filterFutureEvents(
  calendarData: CalendarEntry[],
  days: number,
): CalendarEntry[] {
  calendarData.sort((a, b) => {
    return a.start.getTime() - new Date(b.start).getTime();
  });

  const today = getTodayMorning();
  const todayPlusNDays = new Date(today);
  todayPlusNDays.setDate(todayPlusNDays.getDate() + days);

  const filterStart = today.getTime();
  const filterEnd = todayPlusNDays.getTime();

  const futureDates = calendarData.filter((item) => {
    return (
      (item.start.getTime() >= filterStart &&
        item.start.getTime() < filterEnd) || // following events
      (item.start.getTime() <= filterStart && item.end.getTime() >= filterStart) // currently running event
    );
  });

  return futureDates;
}

/**
 * Returns a date object of today morning at 0:00.
 * This is necessary to include events of today that are already running and passed.
 * @returns {Date} Today morning
 */
function getTodayMorning() {
  const now = new Date();
  const todayMorning = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  return todayMorning;
}
/**
 * Groups calendar data by day.
 * @param {CalendarEntry[]} data All events from the calendar
 * @returns {CalendarEntry[][]} Grouped calendar data by day
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
 * Sorts calendar entries ascending
 * @param {CalendarEntry[]} entries All filteres events
 * @returns {CalendarEntry[]} Grouped calendar data by day
 */
export function sortCalendarEntries(entries: CalendarEntry[]): CalendarEntry[] {
  const sorted = entries.sort((a, b) => a.start.getTime() - b.start.getTime());
  return sorted;
}

/**
 * Transforms calendar data to internal format.
 * @param {CalendarComponent} event External calendar data
 * @param {string?} color Color for <CalendarItem/>
 * @returns {CalendarEntry} Internal calendar data
 */
export function toInternal(
  event: CalendarComponent,
  color?: string,
): CalendarEntry {
  const startDate = new Date(event.start!);
  const endDate = new Date(event.end!);
  const duration = endDate.getTime() - startDate.getTime();

  const newEvent: CalendarEntry = {
    title: typeof event.summary !== "string" ? "*No data*" : event.summary,
    start: startDate,
    end: endDate,
    duration: duration,
    color: color,
  };
  return newEvent;
}

/**
 * Returns all dates with or without a recurrence.
 * @param {FullCalendar} data Parsed data from ical.parseICS
 * @param {number} daysInAdvance Days in advance that should be included
 * @param {string?} color Color for <CalendarItem/>
 * @returns {CalendarEntry[]} List of dates with or without a recurrence
 */
export function getDatesIncludingRecurrences(
  data: FullCalendar,
  daysInAdvance: number,
  color?: string,
): CalendarEntry[] {
  const datesWithRecurrences: CalendarEntry[] = [];

  const rangeStart = new Date(); // today
  const todayPlusNDays = new Date().setDate(
    rangeStart.getDate() + daysInAdvance,
  );
  const rangeEnd = new Date(todayPlusNDays);

  const events = filterValidEvents(data).map((e) => transformEventTimeData(e));
  const internal = getNonRecurringEvents(events).map((e) =>
    toInternal(e, color),
  );
  datesWithRecurrences.push(...internal);

  const recurringEvents = getRecurringEvents(events);
  for (const event of recurringEvents) {
    const dates = event.rrule!.between(rangeStart, rangeEnd, true, () => true);
    // The `dates` array contains the set of dates within our desired date range that are valid
    // for the recurrence rule.
    // `event.recurrence` contains events which were originally controlled by the rrule.
    // However, it has been changed for any reason, which can lead to this: an entry of
    // the `event.recurrence` array might have a date that is not in the range of the rrule
    // (specifically: between rangeStart and rangeEnd). Therefore, we just add this occurrence
    // to the `dates` array which why check later anyways in `getValidRecurrenceEvent`. If the
    // event is not in the range, it will be filtered out.
    const inRange = filterInRangeRecurrences(event, rangeStart, rangeEnd);
    dates.push(...inRange);

    for (const date of dates) {
      const result = getValidRecurrenceEvent(
        event,
        date,
        rangeStart,
        rangeEnd,
        color,
      );
      if (result) {
        datesWithRecurrences.push(result);
      }
    }
  }

  return datesWithRecurrences;
}

/**
 * Transforms duration to end date.
 * @param {CalendarComponent} event Event with duration data
 * @returns {CalendarComponent} Event with end date data
 */
export function transformEventTimeData(
  event: CalendarComponent,
): CalendarComponent {
  if (typeof event.start === "undefined") return event;
  if (typeof event.duration !== "string") return event;

  event.start = new Date(event.start);
  const duration = icsDurationToSeconds(event.duration);
  event.end = new Date(event.start?.getTime() + duration * 1000);
  delete event.duration;
  return event;
}

/**
 * Turns an ICAL-formatted duration into seconds.
 * @param {string} duration ICAL-formatted duration
 * @returns {number} Duration in seconds
 */
export function icsDurationToSeconds(duration: string) {
  const durationRegex = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;

  const matches = duration.match(durationRegex);
  if (!matches) return 0;

  const days = matches[1] ? parseInt(matches[1]) : 0;
  const hours = matches[2] ? parseInt(matches[2]) : 0;
  const minutes = matches[3] ? parseInt(matches[3]) : 0;
  const seconds = matches[4] ? parseInt(matches[4]) : 0;

  return seconds + minutes * 60 + hours * 60 * 60 + days * 24 * 60 * 60;
}

/**
 * Filters all events that are valid for the following calculations
 * @param {FullCalendar} data Parsed data from ical.parseICS
 * @returns {CalendarComponent[]} List of valid events
 */
export function filterValidEvents(data: FullCalendar) {
  const events = [];
  for (const k in data) {
    const event = data[k];
    if (typeof event === "undefined") continue;
    if (typeof event.start === "undefined") continue;
    if (typeof event.end === "undefined" && event.duration === "undefined")
      continue;
    if (event.type !== "VEVENT") continue;
    events.push(event);
  }

  return events;
}
