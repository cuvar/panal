import type { CalendarComponent } from "ical";
import type { CalendarEntry } from "../widgets/calendar/types";

/**
 * Gets all events that do not have a recurrence rule.
 * @param {CalendarComponent[]} events List of valid events
 * @returns {CalendarEntry[]} List of events without a recurrence rule
 */
export function getNonRecurringEvents(events: CalendarComponent[]) {
  return events.filter(
    (event) =>
      typeof event.rrule === "undefined" || typeof event.rrule === "string",
  );
}

/**
 * Gets all events that have a recurrence rule.
 * @param {CalendarComponent[]} events List of valid events
 * @returns {CalendarComponent[]} List of events with a recurrence rule
 */
export function getRecurringEvents(events: CalendarComponent[]) {
  return events.filter(
    (event) =>
      !(typeof event.rrule === "undefined" || typeof event.rrule === "string"),
  );
}

/**
 * Filters all recurrences that are in date range.
 * @param {CalendarComponent} event Event with recurrences
 * @param {Date} rangeStart Start of the range
 * @param {Date} rangeEnd End of the range
 * @returns {Date[]} List of recurrences in date range
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
    if (!r.start && !r.dtstamp) continue;

    const date = new Date((r.start ?? r.dtstamp)!);
    if (date >= rangeStart && date <= rangeEnd) {
      dates.push(date);
    }
  }

  return dates;
}

/**
 * Gets the recurrence event for a given event if valid.
 * @param {CalendarComponent} event The given event
 * @param {Date} date The date to check
 * @param {Date} rangeStart Start of range
 * @param {Date} rangeEnd End of range
 * @returns {CalendarEntry} List of valid recurrence
 */
export function getValidRecurrenceEvent(
  event: CalendarComponent,
  date: Date,
  rangeStart: Date,
  rangeEnd: Date,
) {
  let curEvent = event;
  let curDuration =
    new Date(event.end!).getTime() - new Date(event.start!).getTime();
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
