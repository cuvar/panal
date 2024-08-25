/**
 * @jest-environment node
 */

import { WidgetConfigHelper } from "~/server/domain/config/widgetConfig";
import type { LinkWidgetConfig } from "~/server/widgets/links/types";
import type { SearchWidgetConfig } from "~/server/widgets/search/types";

describe("WidgetConfig:", () => {
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
    const result = WidgetConfigHelper.isFittingDataPaylod(input, "links");
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
    const result = WidgetConfigHelper.isFittingDataPaylod(input, "calendar");
    // assert
    expect(result).toBe(false);
  });
});
