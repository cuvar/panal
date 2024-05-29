/**
 * @jest-environment node
 */

import computeDataSearchWidget from "./data";
import type { SearchWidgetConfig, SearchWidgetData } from "./types";

describe("SearchWidget data", () => {
  it("computeDataSearchWidget works correctly", () => {
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
    const result = computeDataSearchWidget(input);
    // assert
    expect(result).toStrictEqual(expected);
  });
});
