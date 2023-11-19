/**
 * @jest-environment node
 */

import {
  isLinkWidgetConfig,
  isLinkWidgetData,
  isLinkWidgetLink,
} from "./guards";
import type { LinkWidgetConfig, LinkWidgetData, LinkWidgetLink } from "./types";

describe("LinkWidget guards", () => {
  it("isLinkWidgetLink works correctly", () => {
    // arrange
    const input: LinkWidgetLink = {
      text: "string",
      href: "string",
      tab: "new",
    };
    // act
    const result = isLinkWidgetLink(input);
    // assert
    expect(result).toBe(true);
  });

  it("isLinkWidgetLink fails correctly", () => {
    // arrange
    const input = {
      text: "string",
      href: "string",
    };
    // act
    const result = isLinkWidgetLink(input);
    // assert
    expect(result).toBe(false);
  });

  it("isLinkWidgetData works correctly", () => {
    // arrange
    const input: LinkWidgetData = {
      title: "helllo",
      links: [
        {
          text: "string",
          href: "string",
          tab: "new",
        },
      ],
    };
    // act
    const result = isLinkWidgetData(input);
    // assert
    expect(result).toBe(true);
  });

  it("isLinkWidgetData fails correctly", () => {
    // arrange
    const input = {
      text: "string",
      href: "string",
    };
    // act
    const result = isLinkWidgetData(input);
    // assert
    expect(result).toBe(false);
  });

  it("isLinkWidgetConfig works correctly", () => {
    // arrange
    const input: LinkWidgetConfig = {
      title: "helllo",
      links: [
        {
          text: "string",
          href: "string",
          tab: "new",
        },
      ],
    };
    // act
    const result = isLinkWidgetConfig(input);
    // assert
    expect(result).toBe(true);
  });

  it("isLinkWidgetConfig fails correctly", () => {
    // arrange
    const input = {
      text: "string",
      href: "string",
    };
    // act
    const result = isLinkWidgetConfig(input);
    // assert
    expect(result).toBe(false);
  });
});
