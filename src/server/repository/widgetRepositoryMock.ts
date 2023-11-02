import type { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
import type { WidgetRepository } from "./widgetRepository";

export class WidgetRepositoryMock implements WidgetRepository {
  async get(): Promise<AdjustedWidgetConfig[]> {
    return Promise.resolve([]);
  }

  async set(widgets: AdjustedWidgetConfig[]): Promise<void> {
    //
  }
}
