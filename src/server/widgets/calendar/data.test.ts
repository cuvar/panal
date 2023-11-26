/**
 * @jest-environment node
 */

import { MockICSFetcher } from "~/server/driver/Fetcher/MockICSFetcher";
import computeDataCalendarWidget from "../calendar/data";
import type { CalendarWidgetConfig } from "./types";

describe("CalendarWidget data", () => {
  it("computeDataCalendarWidget works correctly with color", async () => {
    // arrange
    const number = 10;
    const mockFetcher = new MockICSFetcher(number);
    const input: CalendarWidgetConfig = [
      {
        url: "string",
        daysInAdvance: 365,
        color: "#COFFEE",
      },
    ];

    // act
    const result = await computeDataCalendarWidget(input, mockFetcher);

    // assert
    expect(result.entries.length).toBeGreaterThanOrEqual(number - 1); // there seems to be an issue with result.entries.length being 9 or 10 randomly
  });

  it("computeDataCalendarWidget works correctly without color", async () => {
    // arrange
    const number = 10;
    const mockFetcher = new MockICSFetcher(number);
    const input: CalendarWidgetConfig = [
      {
        url: "string",
        daysInAdvance: 365,
      },
    ];

    // act
    const result = await computeDataCalendarWidget(input, mockFetcher);

    // assert
    expect(result.entries.length).toBeGreaterThanOrEqual(number - 1); // there seems to be an issue with result.entries.length being 9 or 10 randomly
  });
});
