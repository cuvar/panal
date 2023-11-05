import { env } from "~/env.mjs";
import { FileReader } from "~/server/driver/Reader/FileReader";
import { WidgetConfig } from "~/server/entities/widgetConfig";
import { parseWidgetConfigArray } from "~/server/service/parseWidgetConfigService";
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

/**
 * Saves the widget config to the widget store,
 * @param {object} data Widget config
 * @param {LayoutRepository} repo Repository used for storage
 */
export async function saveUserWidgetConfig(
  data: object,
  repo: ConfigRepository,
) {
  const parsed = parseWidgetConfigArray(JSON.stringify(data));
  if (parsed === null) {
    throw new AppError("Cannot parse widget config");
  }

  try {
    await repo.setAll(parsed);
  } catch (error) {
    throw new AppError("Cannot save user widget config", error, true);
  }
}

/**
 * Updates the widget config of widget with ID `id` and content `widgets` to the widget store
 * @param {string} id ID of widget
 * @param {object} widget Entered widget config from user
 * @param {ConfigRepository} repo Repository used for storage
 */
export async function updateUserWidgetConfig(
  id: string,
  widget: object,
  repo: ConfigRepository,
) {
  if (!WidgetConfig.validate(widget)) {
    throw new AppError(`Cannot parse widget config`);
  }

  try {
    await repo.set(id, widget);
  } catch (error) {
    throw new AppError("Cannot save user widget config", error, true);
  }
}
