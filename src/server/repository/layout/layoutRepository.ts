import { env } from "~/env.mjs";
import AppError from "~/utils/error";
import { FileReader } from "../../driver/Reader/FileReader";
import type { AdjustedWidgetLayout } from "../../entities/adjustedWidgetLayout";
import parseUserWidgetLayout from "../../service/parseWidgetConfigService";
import transformWidgetLayout from "../../service/transformWidgetLayoutService";
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

/**
 * Saves the widget config to the widget store,
 * @param {object} data Widget config
 * @param {LayoutRepository} repo Repository used for storage
 */
export async function saveUserWidgetLayout(
  data: object,
  repo: LayoutRepository,
) {
  const parsed = parseUserWidgetLayout(JSON.stringify(data));
  if (parsed === null) {
    throw new AppError("Cannot parse widget config");
  }

  try {
    const adjustedWidgetLayout = transformWidgetLayout(parsed);
    await repo.setAll(adjustedWidgetLayout);
  } catch (error) {
    throw new AppError("Cannot save user widget config", error, true);
  }
}

/**
 * Updates the widget config of widget with ID `id` and content `widgets` to the widget store
 * @param {string} id ID of widget
 * @param {object} widget Entered widget config from user
 * @param {LayoutRepository} repo Repository used for storage
 */
export async function updateUserWidgetLayout(
  widget: AdjustedWidgetLayout,
  repo: LayoutRepository,
) {
  try {
    await repo.set(widget.id, widget);
  } catch (error) {
    throw new AppError("Cannot save user widget config", error, true);
  }
}
