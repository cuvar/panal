/**
 * @jest-environment node
 */

import {
  isSearchEngine,
  isSearchWidgetConfig,
  isSearchWidgetData,
} from "./guards";
import type {
  SearchEngine,
  SearchWidgetConfig,
  SearchWidgetData,
} from "./types";

describe("SearchWidget guards", () => {
  it("isSearchEngine works correctly", () => {
    // arrange
    const input: SearchEngine = {
      key: "google",
      displayName: "string",
      url: "string",
    };
    // act
    const result = isSearchEngine(input);
    // assert
    expect(result).toBe(true);
  });

  it("isSearchEngine fails correctly", () => {
    // arrange
    const input = {
      key: "google",
      displayName: "string",
    };
    // act
    const result = isSearchEngine(input);
    // assert
    expect(result).toBe(false);
  });

  it("isSearchWidgetData works correctly", () => {
    // arrange
    const input: SearchWidgetData = {
      searchEngines: [
        {
          key: "google",
          displayName: "string",
          url: "string",
        },
      ],
    };
    // act
    const result = isSearchWidgetData(input);
    // assert
    expect(result).toBe(true);
  });

  it("isSearchWidgetData fails correctly", () => {
    // arrange
    const input = [
      {
        key: "google",
        displayName: "string",
        url: "string",
      },
    ];
    // act
    const result = isSearchWidgetData(input);
    // assert
    expect(result).toBe(false);
  });

  it("isSearchWidgetConfig works correctly", () => {
    // arrange
    const input: SearchWidgetConfig = [
      {
        key: "google",
        displayName: "string",
        url: "string",
      },
    ];
    // act
    const result = isSearchWidgetConfig(input);
    // assert
    expect(result).toBe(true);
  });

  it("isSearchWidgetConfig fails correctly", () => {
    // arrange
    const input = {
      key: "google",
      displayName: "string",
      url: "string",
    };
    // act
    const result = isSearchWidgetConfig(input);
    // assert
    expect(result).toBe(false);
  });
});
