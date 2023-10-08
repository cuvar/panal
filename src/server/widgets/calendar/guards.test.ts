/**
 * @jest-environment node
 */

import { isCalendarWidgetConfig, isCalendarWidgetData } from "./guards";
import type { CalendarWidgetConfig, CalendarWidgetData } from "./types";

describe("CalendarWidget guards", () => {
  it("isCalendarWidgetConfig works correctly", () => {
    // arrange
    const input: CalendarWidgetConfig = {
      url: "https://google.com/",
      daysInAdvance: 7,
    };
    // act
    const result = isCalendarWidgetConfig(input);
    // assert
    expect(result).toBe(true);
  });

  it("isCalendarWidgetConfig fails correctly", () => {
    // arrange
    const input = [
      {
        key: "ecosia",
        displayName: "Ecosia",
        url: "https://www.ecosia.org/search?q=",
      },
      {
        key: "google",
        displayName: "Google",
        url: "https://google.com/search?q=",
      },
    ];
    // act
    const result = isCalendarWidgetConfig(input);
    // assert
    expect(result).toBe(false);
  });

  it("isCalendarWidgetData works correctly", () => {
    // arrange
    const input: CalendarWidgetData = {
      entries: [
        [
          {
            title: "string",
            start: new Date(),
            end: new Date(),
            duration: 2,
          },
        ],
      ],
    };
    // act
    const result = isCalendarWidgetData(input);
    // assert
    expect(result).toBe(true);
  });

  it("isCalendarWidgetData fails correctly", () => {
    // arrange
    const input = {
      entries: {
        title: "string",
        start: new Date(),
        end: new Date(),
        duration: 2,
      },
    };
    // act
    const result = isCalendarWidgetData(input);
    // assert
    expect(result).toBe(false);
  });
});
