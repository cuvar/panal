import AppError from "~/utils/error";
import { type AdjustedWidgetLayout } from "../../entities/adjustedWidgetLayout";
import type { LayoutRepository } from "./layoutRepository";

export class LayoutRepositoryMock implements LayoutRepository {
  get(id: string): Promise<AdjustedWidgetLayout> {
    throw new AppError("Not implemented");
  }

  async getAll(): Promise<AdjustedWidgetLayout[]> {
    return Promise.resolve([]);
  }

  async set(id: string, widgets: AdjustedWidgetLayout): Promise<void> {
    //
  }

  async setAll(widgets: AdjustedWidgetLayout[]): Promise<void> {
    //
  }
}
