/**
 * @jest-environment node
 */

import computeLinkWidgetData from "../links/data";
import type { LinkWidgetConfig, LinkWidgetData } from "../links/types";

describe("LinkWidget data", () => {
  it("computeLinkWidgetData works correctly", () => {
    // arrange
    const input: LinkWidgetConfig = {
      title: "string",
      links: [
        {
          text: "string",
          href: "string",
          tab: "new",
        },
      ],
    };

    const expected: LinkWidgetData = {
      title: "string",
      links: [
        {
          text: "string",
          href: "string",
          tab: "new",
        },
      ],
    };
    // act
    const result = computeLinkWidgetData(input);
    // assert
    expect(result).toStrictEqual(expected);
  });
});
