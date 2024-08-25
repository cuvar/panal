/**
 * @jest-environment node
 */

import { generateUniqueID } from "./widget.service";

describe("helper functions", () => {
  it("generateUniqueID works correctly", () => {
    // arrange
    // act
    const result = generateUniqueID();
    // assert
    expect(result).toHaveLength(24);
  });
});
