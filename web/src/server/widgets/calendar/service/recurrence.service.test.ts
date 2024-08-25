import type { CalendarComponent } from "ical";
import {
  formatDateForICS,
  getCalendarComponentMock,
  getRecurringCalendarComponentMock,
} from "./MockCalendarComponentFactory";
import {
  filterInRangeRecurrences,
  getNonRecurringEvents,
  getRecurringEvents,
  getValidRecurrenceEvent,
} from "./recurrence.service";

describe("recurrenceService", () => {
  let events: CalendarComponent[] = [];

  beforeEach(() => {
    events = [];
    // arrange
    for (let i = 0; i < 9; i++) {
      const event =
        i % 2 === 0
          ? getCalendarComponentMock()
          : getRecurringCalendarComponentMock();
      events.push(event);
    }
  });

  it("getNonRecurringEvents works correctly", () => {
    // arrange
    const expectedNumber = 5;

    // act
    const result = getNonRecurringEvents(events);

    // assert
    const filtered = result.filter(
      (e) => typeof e.rrule === "undefined" || typeof e.rrule === "string",
    );

    expect(result.length).toBe(expectedNumber);
    expect(filtered.length).toBe(expectedNumber);
  });

  it("getRecurringEvents works correctly", () => {
    // arrange
    const expectedNumber = 4;

    // act
    const result = getRecurringEvents(events);

    // assert
    // assert
    const filtered = result.filter(
      (e) => !(typeof e.rrule === "undefined" || typeof e.rrule === "string"),
    );

    expect(result.length).toBe(expectedNumber);
    expect(filtered.length).toBe(expectedNumber);
  });

  it("filterInRangeRecurrences works correctly", () => {
    // arrange
    const rangeStart = new Date(Date.now() - 1000 * 60 * 60 * 24);
    const rangeEnd = new Date(Date.now() + 1000 * 60 * 60 * 24 * 100);
    const inputDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);
    const input = getRecurringCalendarComponentMock();
    const input2 = getRecurringCalendarComponentMock();
    input2.recurrences = [
      {
        ...getRecurringCalendarComponentMock(),
      } as CalendarComponent,
    ];
    input2.recurrences[0]!.start = inputDate;
    input2.recurrences[0]!.end = inputDate;

    // act
    const result = filterInRangeRecurrences(input, rangeStart, rangeEnd);
    const result2 = filterInRangeRecurrences(input2, rangeStart, rangeEnd);

    // assert
    expect(result.length).toBe(0);
    expect(result2.length).toBe(1);
    expect(result2[0]).toBeInstanceOf(Date);
    expect(formatDateForICS(result2[0]!)).toEqual(formatDateForICS(inputDate));
  });

  it("getValidRecurrenceEvent works correctly", () => {
    // arrange
    const rangeStart = new Date(Date.now() - 1000 * 60 * 60 * 24);
    const rangeEnd = new Date(Date.now() + 1000 * 60 * 60 * 24 * 100);
    const inputDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);
    const input = getRecurringCalendarComponentMock();
    const duration = input.end!.getTime() - input.start!.getTime();
    const expectedEnd = new Date(inputDate.getTime() + duration);

    // act
    const result = getValidRecurrenceEvent(
      input,
      inputDate,
      rangeStart,
      rangeEnd,
    );

    // assert
    expect(result).not.toBeNull();
    expect(result!.start).toEqual(inputDate);
    expect(result!.end).toEqual(expectedEnd);
  });
});
