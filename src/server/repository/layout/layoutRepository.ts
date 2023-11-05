import { env } from "~/env.mjs";
import AppError from "~/utils/error";
import { FileReader } from "../../driver/Reader/FileReader";
import type { AdjustedWidgetLayout } from "../../entities/adjustedWidgetLayout";
import { LayoutLocalFileRepository } from "./layoutLocalFileRepository";
import { LayoutRepositoryMock } from "./layoutRepositoryMock";
import { LayoutUpstashRepository } from "./layoutUpstashRepository";

export interface LayoutRepository {
  get(id: string): Promise<AdjustedWidgetLayout>;
  getAll(): Promise<AdjustedWidgetLayout[]>;
  setAll(widgets: AdjustedWidgetLayout[]): Promise<void>;
  set(id: string, widgets: AdjustedWidgetLayout): Promise<void>;
}

/**
 * Gets the widget repository
 * @returns {LayoutRepository} Widget repository
 */
export function getLayoutRepository(): LayoutRepository {
  let repo: LayoutRepository | null = null;
  if (env.WIDGET_STORE == "upstash") {
    repo = new LayoutUpstashRepository();
  } else if (env.WIDGET_STORE == "file") {
    repo = new LayoutLocalFileRepository(new FileReader());
  } else if (env.WIDGET_STORE == "mock") {
    repo = new LayoutRepositoryMock();
  }

  if (!repo) {
    throw new AppError("Widget repository not defined", null, true);
  }

  return repo;
}
