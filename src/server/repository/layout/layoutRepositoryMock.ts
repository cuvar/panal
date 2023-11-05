import type { AdjustedWidgetLayout } from "../../entities/adjustedWidgetConfig";
import type { LayoutRepository } from "./layoutRepository";

export class LayoutRepositoryMock implements LayoutRepository {
  async get(): Promise<AdjustedWidgetLayout[]> {
    return Promise.resolve([]);
  }

  async set(widgets: AdjustedWidgetLayout[]): Promise<void> {
    //
  }
}
