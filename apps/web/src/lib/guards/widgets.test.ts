/**
 * @jest-environment node
 */

import type { LinkWidgetConfig } from "~/server/widgets/links/types";
import type { SearchWidgetConfig } from "~/server/widgets/search/types";
import type {
  Layout,
  PartialScreenSizePositioning,
  Positioning,
  ScreenSizePositioning,
} from "../types/widget";
import {
  isFittingDataPaylod,
  isLayout,
  isPartialScreenSizePositioning,
  isPositioning,
  isScreenSizePositioning,
  isWidgetType,
} from "./widgets";

describe("guards - widgets:", () => {
  it("isFittingDataPaylod works correctly", () => {
    // arrange
    const input: LinkWidgetConfig = {
      title: "hello",
      links: [
        {
          text: "GitHub",
          href: "https://github.com/cuvar",
          tab: "new",
        },
        {
          text: "Google Calendar",
          href: "https://calendar.google.com/",
          tab: "new",
        },
        {
          text: "Panal repo",
          href: "https://github.com/cuvar/panal",
          tab: "same",
        },
      ],
    };
    // act
    const result = isFittingDataPaylod(input, "links");
    // assert
    expect(result).toBe(true);
  });

  it("isFittingDataPaylod fails correctly", () => {
    // arrange
    const input: SearchWidgetConfig = [
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
      {
        key: "duckduckgo",
        displayName: "DuckDuckGo",
        url: "https://duckduckgo.com/?q=",
      },
      {
        key: "gdrive",
        displayName: "Google Drive",
        url: "https://drive.google.com/drive/search?q=",
      },
    ];
    // act
    const result = isFittingDataPaylod(input, "calendar");
    // assert
    expect(result).toBe(false);
  });

  it.each(["calendar", "search", "links", "time"])(
    "isWidgetType works correctly",
    (input) => {
      // act
      const result = isWidgetType(input);
      // assert
      expect(result).toBe(true);
    },
  );

  it("isWidgetType fails correctly", () => {
    // arrange
    const input = "oh-no";
    // act
    const result = isWidgetType(input);
    // assert
    expect(result).toBe(false);
  });

  it("isLayout works correctly", () => {
    // arrange
    const input: Layout = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };
    // act
    const result = isLayout(input);
    // assert
    expect(result).toBe(true);
  });

  it("isLayout fails correctly", () => {
    // arrange
    const input = {
      x: "0",
      y: "0",
      w: "0",
      h: 0,
    };
    // act
    const result = isLayout(input);
    // assert
    expect(result).toBe(false);
  });

  it("isPositioning works correctly", () => {
    // arrange
    const input: Positioning = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };
    // act
    const result = isPositioning(input);
    // assert
    expect(result).toBe(true);
  });

  it("isPositioning fails correctly", () => {
    // arrange
    const input = {
      x: "0",
      y: "0",
      w: "0",
      h: 0,
    };
    // act
    const result = isPositioning(input);
    // assert
    expect(result).toBe(false);
  });

  it("isPartialScreenSizePositioning works correctly", () => {
    // arrange
    const input: PartialScreenSizePositioning = {
      lg: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      md: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      sm: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xs: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xss: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
    };
    // act
    const result = isPartialScreenSizePositioning(input);
    // assert
    expect(result).toBe(true);
  });

  it("isPartialScreenSizePositioning fails correctly", () => {
    // arrange
    const input = {
      oh: "no",
    };
    // act
    const result = isPartialScreenSizePositioning(input);
    // assert
    expect(result).toBe(false);
  });

  it("isScreenSizePositioning works correctly", () => {
    // arrange
    const input: ScreenSizePositioning = {
      xl: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      lg: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      md: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      sm: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xs: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xss: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
    };
    // act
    const result = isScreenSizePositioning(input);
    // assert
    expect(result).toBe(true);
  });

  it("isScreenSizePositioning fails correctly", () => {
    // arrange
    const input = {
      xl: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      xss: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
    };
    // act
    const result = isScreenSizePositioning(input);
    // assert
    expect(result).toBe(false);
  });
});
