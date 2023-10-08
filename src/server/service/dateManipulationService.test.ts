/**
 * @jest-environment node
 */

import type { CalendarEntry } from "../widgets/calendar/types";
import {
  filterFutureEvents,
  groupCalendarWidgetByDay,
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
});
