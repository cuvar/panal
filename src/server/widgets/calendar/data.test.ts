/**
 * @jest-environment node
 */

import { MockICSFetcher } from "~/server/driver/Fetcher/MockICSFetcher";
import computeCalendarWidgetData from "../calendar/data";
import type { CalendarWidgetConfig } from "./types";

describe("CalendarWidget data", () => {
  it("computeCalendarWidgetData works correctly", async () => {
    // arrange
    const number = 10;
    const mockFetcher = new MockICSFetcher(number);
    const input: CalendarWidgetConfig = {
      url: "string",
      daysInAdvance: 365,
    };

    // act
    const result = await computeCalendarWidgetData(input, mockFetcher);

    // assert
    expect(result.entries.length).toEqual(number);
  });
});
