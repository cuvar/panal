import type { CalendarComponent } from "ical";
import ical from "ical";

/**
 * Generates a calendar component mock.
 * @param {boolean} recurring Indicates whether the event should be recurring
 * @returns {CalendarComponent} Calendar component
 */
export function getCalendarComponentMock(): CalendarComponent {
  const event = {
    type: "VEVENT",
    summary: "Test",
    start: new Date(),
    end: new Date(Date.now() + 1000 * 60 * 60 * 24),
  } as CalendarComponent;

  return event;
}

/**
 * Generates a mock calendar component with recurrence rule.
 * @returns
 */
export function getRecurringCalendarComponentMock() {
  const startDate = new Date(Date.now() + 1000 * 60 * 60 * 3);
  const endDate = new Date(Date.now() + 1000 * 60 * 60 * 4);

  const string = `
BEGIN:VEVENT
SUMMARY:Bi-Weekly Meeting
DTSTART:${formatDateForICS(startDate)}
DTEND:${formatDateForICS(endDate)}
RRULE:FREQ=WEEKLY;INTERVAL=2;COUNT=2
END:VEVENT
`; // ! DO NOT INDENT THIS STRING

  const result = ical.parseICS(string);
  return result[Object.keys(result)[0]!]! as CalendarComponent;
}

/**
 * Formats a date for ICS. DTSTART and DTEND require the following format: YYYYMMDDTHHMMSS
 * @param {Date} date Date to format
 * @returns {string} String formatted for ICS
 */
export function formatDateForICS(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").slice(0, 15);
}
