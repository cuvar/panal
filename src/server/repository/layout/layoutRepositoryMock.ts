import AppError from "~/utils/error";
import { type AdjustedWidgetLayout } from "../../entities/adjustedWidgetLayout";
import type { LayoutRepository } from "./layoutRepository";

export class LayoutRepositoryMock implements LayoutRepository {
  async getAll(): Promise<AdjustedWidgetLayout[]> {
    return Promise.resolve([]);
  }

  get(id: string): Promise<AdjustedWidgetLayout> {
    throw new AppError("Not implemented");
  }

  async set(widgets: AdjustedWidgetLayout[]): Promise<void> {
    //
  }
}
