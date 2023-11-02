import { env } from "~/env.mjs";
import AppError from "~/utils/error";
import type { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
import { type UserWidgetConfig } from "../entities/userWidgetConfig";
import parseUserWidgetConfig from "../service/parseWidgetConfigService";
import transformWidgetConfig from "../service/transformWidgetConfigService";
import { WidgetLocalFileRepository } from "./widgetLocalFileRepository";
import { WidgetRepositoryMock } from "./widgetRepositoryMock";
import { WidgetUpstashRepository } from "./widgetUpstashRepository";

export interface WidgetRepository {
  get(): Promise<AdjustedWidgetConfig[]>;
  set(widgets: AdjustedWidgetConfig[]): Promise<void>;
}

/**
 * Gets the widget repository
 * @returns {WidgetRepository} Widget repository
 */
export function getWidgetRepository(): WidgetRepository {
  let repo: WidgetRepository | null = null;
  if (env.WIDGET_STORE == "upstash") {
    repo = new WidgetUpstashRepository();
  } else if (env.WIDGET_STORE == "file") {
    repo = new WidgetLocalFileRepository();
  } else if (env.WIDGET_STORE == "mock") {
    repo = new WidgetRepositoryMock();
  }

  if (!repo) {
    throw new AppError("Widget repository not defined", null, true);
  }

  return repo;
}

/**
 * Saves the widget config to the widget store,
 * @param {object} data Widget config
 * @param {WidgetRepository} repo Repository used for storage
 */
export async function saveUserWidgetConfig(
  data: object,
  repo: WidgetRepository,
) {
  const parsed = parseUserWidgetConfig(JSON.stringify(data));
  if (parsed === null) {
    throw new AppError("Cannot parse widget config");
  }

  try {
    const adjustedWidgetConfig = transformWidgetConfig(parsed);
    await repo.set(adjustedWidgetConfig);
  } catch (error) {
    throw new AppError("Cannot save user widget config", error, true);
  }
}

/**
 * Updates the widget config of widget with ID `id` and content `widgets` to the widget store
 * @param {string} id ID of widget
 * @param {object} widgets Entered widget config from user
 */
export async function updateUserWidgetConfig(id: string, widgets: object) {
  const newParsed = parseUserWidgetConfig(JSON.stringify([widgets]));

  if (newParsed === null || !Array.isArray(newParsed) || newParsed.length < 1) {
    throw new AppError("Cannot parse widget config");
  }

  const awc = await getWidgetRepository().get();
  const currentConfig = awc.find((e) => e.id === id) as UserWidgetConfig;

  if (!currentConfig) {
    throw new AppError(`No widget with ID ${id}`);
  }

  // TODO: is this really updating the original object?
  currentConfig.data = newParsed[0]!.data;
  currentConfig.layout = newParsed[0]!.layout;

  try {
    const adjustedWidgetConfig = transformWidgetConfig(awc);
    await getWidgetRepository().set(adjustedWidgetConfig);
  } catch (error) {
    throw new AppError("Cannot save user widget config", error, true);
  }
}

/**
 * Saves the widget config to the widget store
 * @param {AdjustedWidgetConfig[]} data Config to save
 */
export async function saveAdjustedWidgetConfig(data: AdjustedWidgetConfig[]) {
  try {
    await getWidgetRepository().set(data);
  } catch (error) {
    throw new AppError("Cannot save adjusted widget config", error, true);
  }
}
