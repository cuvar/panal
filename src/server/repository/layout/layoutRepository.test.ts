/**
 * @jest-environment node
 */

import { saveUserWidgetConfig } from "./layoutRepository";
import { LayoutRepositoryMock } from "./layoutRepositoryMock";

describe("Layout repository:", () => {
  test("throws correctly on empty data", async () => {
    // arrange
    const repo = new LayoutRepositoryMock();
    const input = {};

    // act
    const action = async () => {
      await saveUserWidgetConfig(input, repo);
    };

    // assert
    await expect(action()).rejects.toThrow("Cannot parse widget config");
  });

  test("throws on empty data", async () => {
    // arrange
    const repo = new LayoutRepositoryMock();
    const input: object = [];

    // act
    const action = async () => {
      await saveUserWidgetConfig(input, repo);
    };

    // assert
    await expect(action()).resolves.toBeUndefined();
  });
});
