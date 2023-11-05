import type { AdjustedWidgetConfig } from "../../entities/adjustedWidgetConfig";
import type { LayoutRepository } from "./widgetRepository";

export class LayoutRepositoryMock implements LayoutRepository {
  async get(): Promise<AdjustedWidgetConfig[]> {
    return Promise.resolve([]);
  }

  async set(widgets: AdjustedWidgetConfig[]): Promise<void> {
    //
  }
}