import { env } from "~/env.mjs";
import AppError from "~/utils/error";
import type { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
import parseUserWidgetConfig from "../service/parseWidgetConfigService";
import transformWidgetConfig from "../service/transformWidgetConfigService";
import { WidgetLocalFileRepository } from "./widgetLocalFileRepository";
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
  }

  if (!repo) {
    throw new AppError("Widget repository not defined", null, true);
  }

  return repo;
}

/**
 * Saves the widget config to the widget store
 * @param {object} data widget config
 */
export async function saveUserWidgetConfig(data: object) {
  const parsed = parseUserWidgetConfig(JSON.stringify(data));
  if (parsed === null) {
    throw new AppError("Cannot parse widget config");
  }

  try {
    const adjustedWidgetConfig = transformWidgetConfig(parsed);
    await getWidgetRepository().set(adjustedWidgetConfig);
  } catch (error) {
    throw new AppError("Cannot save user widget config", error, true);
  }
}
