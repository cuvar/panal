import type { AdjustedWidgetLayout } from "../../entities/adjustedWidgetLayout";
import type { LayoutRepository } from "./layoutRepository";

export class LayoutRepositoryMock implements LayoutRepository {
  async get(): Promise<AdjustedWidgetLayout[]> {
    return Promise.resolve([]);
  }

  async set(widgets: AdjustedWidgetLayout[]): Promise<void> {
    //
  }
}
