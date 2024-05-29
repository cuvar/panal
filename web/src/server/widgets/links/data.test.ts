/**
 * @jest-environment node
 */

import computeDataLinkWidget from "../links/data";
import type { LinkWidgetConfig, LinkWidgetData } from "../links/types";

describe("LinkWidget data", () => {
  it("computeDataLinkWidget works correctly", () => {
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
    const result = computeDataLinkWidget(input);
    // assert
    expect(result).toStrictEqual(expected);
  });
});
