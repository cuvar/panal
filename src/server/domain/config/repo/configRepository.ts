import { env } from "~/env.mjs";
import { type WidgetConfig } from "~/server/domain/config/widgetConfig";
import { FileReader } from "~/server/driver/Reader/FileReader";
import AppError from "~/utils/error";
import { ConfigLocalFileRepository } from "./configLocalFileRepository";
import { ConfigRepositoryMock } from "./configRepositoryMock";
import { ConfigUpstashRepository } from "./configUpstashRepository";

export interface ConfigRepository {
  get(id: string): Promise<WidgetConfig>;
  getAll(): Promise<WidgetConfig[]>;
  set(id: string, data: WidgetConfig): Promise<void>;
  setAll(data: WidgetConfig[]): Promise<void>;
}

/**
 * Gets the widget repository
 * @returns {ConfigRepository} Widget repository
 */
export function getConfigRepository(): ConfigRepository {
  let repo: ConfigRepository | null = null;
  if (env.WIDGET_STORE == "upstash") {
    repo = new ConfigUpstashRepository();
  } else if (env.WIDGET_STORE == "file") {
    repo = new ConfigLocalFileRepository(new FileReader());
  } else if (env.WIDGET_STORE == "mock") {
    repo = new ConfigRepositoryMock();
  }

  if (!repo) {
    throw new AppError("Widget repository not defined", null, true);
  }

  return repo;
}
