/**
 * @jest-environment node
 */

import computeSearchWidgetData from "./data";
import type { SearchWidgetConfig, SearchWidgetData } from "./types";

describe("SearchWidget data", () => {
  it("computeSearchWidgetData works correctly", () => {
    // arrange
    const input: SearchWidgetConfig = [
      {
        key: "google",
        displayName: "string",
        url: "string",
      },
    ];
    const expected: SearchWidgetData = {
      searchEngines: [
        {
          key: "google",
          displayName: "string",
          url: "string",
        },
      ],
    };
    // act
    const result = computeSearchWidgetData(input);
    // assert
    expect(result).toStrictEqual(expected);
  });
});
