/**
 * @jest-environment node
 */

import type { CalendarComponent, FullCalendar } from "ical";
import type { CalendarEntry } from "../widgets/calendar/types";
import {
  getCalendarComponentMock,
  getRecurringCalendarComponentMock,
} from "./MockCalendarComponentFactory";
import {
  filterFutureEvents,
  filterValidEvents,
  getDatesIncludingRecurrences,
  groupCalendarWidgetByDay,
  icsDurationToSeconds,
  toInternal,
  transformEventTimeData,
} from "./dateManipulationService";

describe("dateManipulationService", () => {
  const day = 1000 * 60 * 60 * 24;
  const today = Date.now();

  it("filterFutureEvents works correctly", () => {
    // arrange
    const daysInAdvance = 7;
    const entries: CalendarEntry[] = [
      {
        title: "Test1",
        start: new Date(today - 10 * day),
        end: new Date(today - 10 * day),
        duration: 1,
      },
      {
        title: "Test2",
        start: new Date(today - 365 * day),
        end: new Date(today - 365 * day),
        duration: 1,
      },
      {
        title: "Test3",
        start: new Date(today + 1 * day),
        end: new Date(today + 1 * day),
        duration: 1,
      },
      {
        title: "Test4",
        start: new Date(today + (daysInAdvance + 1) * day),
        end: new Date(today + (daysInAdvance + 1) * day),
        duration: 1,
      },
    ];
    const expected: CalendarEntry[] = [
      {
        title: "Test3",
        start: new Date(today + 1 * day),
        end: new Date(today + 1 * day),
        duration: 1,
      },
    ];

    // act
    const result = filterFutureEvents(entries, daysInAdvance);

    // assert
    expect(result).toStrictEqual(expected);
  });

  it("groupCalendarWidgetByDay works correctly", () => {
    // arrange
    const entries: CalendarEntry[] = [
      {
        title: "Test1",
        start: new Date(today - 10 * day),
        end: new Date(today - 10 * day),
        duration: 1,
      },
      {
        title: "Test2",
        start: new Date(today - 365 * day),
        end: new Date(today - 365 * day),
        duration: 1,
      },
      {
        title: "Test3",
        start: new Date(today + 1 * day),
        end: new Date(today + 1 * day),
        duration: 1,
      },
      {
        title: "Test4",
        start: new Date(today + 1 * day),
        end: new Date(today + 1 * day),
        duration: 1,
      },
    ];
    const expected: CalendarEntry[][] = [
      [
        {
          title: "Test1",
          start: new Date(today - 10 * day),
          end: new Date(today - 10 * day),
          duration: 1,
        },
      ],
      [
        {
          title: "Test2",
          start: new Date(today - 365 * day),
          end: new Date(today - 365 * day),
          duration: 1,
        },
      ],
      [
        {
          title: "Test3",
          start: new Date(today + 1 * day),
          end: new Date(today + 1 * day),
          duration: 1,
        },
        {
          title: "Test4",
          start: new Date(today + 1 * day),
          end: new Date(today + 1 * day),
          duration: 1,
        },
      ],
    ];

    // act
    const result = groupCalendarWidgetByDay(entries);

    // assert
    expect(result).toStrictEqual(expected);
  });

  it("icsDurationToSeconds works correctly", () => {
    // arrange
    const input = "PT1H";
    const expected = 3600;

    // act
    const result = icsDurationToSeconds(input);

    // assert
    expect(result).toStrictEqual(expected);
  });

  it("getDatesIncludingRecurrences works correctly", () => {
    // arrange
    const events: FullCalendar = {};
    for (let i = 0; i < 9; i++) {
      const event =
        i % 2 === 0
          ? getCalendarComponentMock()
          : getRecurringCalendarComponentMock();

      events[i] = event;
    }
    const daysInAdvance = 100;

    // act
    const result = getDatesIncludingRecurrences(events, daysInAdvance);

    // assert
    expect(result.length).toBe(13); // 5 non-recurring, 4 recurring each with 2 recurrences = 8
  });

  it("transformEventTimeData works correctly", () => {
    // arrange
    const ccm = getCalendarComponentMock();
    const input = { ...ccm };
    delete input.end;
    input.duration = "PT2H30M";

    const expected = { ...ccm };
    expected.end = new Date(expected.start!.getTime() + 2.5 * 60 * 60 * 1000);

    // act
    const result = transformEventTimeData(input);

    // assert
    expect(result).toStrictEqual(expected);
  });

  it("filterValidEvents works correctly", () => {
    // arrange
    const first = getCalendarComponentMock();
    const second = getCalendarComponentMock();
    const third = getCalendarComponentMock();
    first.start = undefined;

    const input: FullCalendar = {
      "1": first,
      "2": second,
      "3": third,
    };

    const expected: CalendarComponent[] = [second, third];

    // act
    const result = filterValidEvents(input);

    // assert
    expect(result).toStrictEqual(expected);
  });

  it("toInternal works correctly", () => {
    // arrange
    const input = getCalendarComponentMock();

    // act
    const result = toInternal(input);

    // assert
    expect(result).not.toBeNull();
    expect(typeof result.title).toBe("string");
    expect(result.start instanceof Date).toBe(true);
    expect(result.end instanceof Date).toBe(true);
    expect(typeof result.duration).toBe("number");
  });
});
