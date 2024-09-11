import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import { type AdjustedWidgetLayout } from "../adjustedWidgetLayout";
import type { ILayoutRepository } from "./layoutRepository";

export class LayoutRepositoryMock implements ILayoutRepository {
  async init(): Promise<void> {
    // no needed
  }

  get(id: string): Promise<AdjustedWidgetLayout> {
    throw new AppError(codes.REPOSITORY_NOT_IMPLEMENTED);
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
