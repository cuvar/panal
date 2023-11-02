/**
 * @jest-environment node
 */

import { saveUserWidgetConfig } from "./widgetRepository";
import { WidgetRepositoryMock } from "./widgetRepositoryMock";

describe("Widget repository:", () => {
  test("throws correctly on empty data", async () => {
    // arrange
    const repo = new WidgetRepositoryMock();
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
    const repo = new WidgetRepositoryMock();
    const input: object = [];

    // act
    const action = async () => {
      await saveUserWidgetConfig(input, repo);
    };

    // assert
    await expect(action()).resolves.toBeUndefined();
  });
});
