import { env } from "~/env.mjs";
import AppError from "~/utils/error";
import { FileReader } from "../../driver/Reader/FileReader";
import type { AdjustedWidgetLayout } from "../../entities/adjustedWidgetLayout";
import { type UserWidgetLayout } from "../../entities/userWidgetLayout";
import parseUserWidgetLayout from "../../service/parseWidgetConfigService";
import transformWidgetLayout from "../../service/transformWidgetLayoutService";
import { WidgetLocalFileRepository } from "./layoutLocalFileRepository";
import { LayoutRepositoryMock } from "./layoutRepositoryMock";
import { WidgetUpstashRepository } from "./layoutUpstashRepository";

export interface LayoutRepository {
  get(): Promise<AdjustedWidgetLayout[]>;
  set(widgets: AdjustedWidgetLayout[]): Promise<void>;
}

/**
 * Gets the widget repository
 * @returns {LayoutRepository} Widget repository
 */
export function getLayoutRepository(): LayoutRepository {
  let repo: LayoutRepository | null = null;
  if (env.WIDGET_STORE == "upstash") {
    repo = new WidgetUpstashRepository();
  } else if (env.WIDGET_STORE == "file") {
    repo = new WidgetLocalFileRepository(new FileReader());
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
    await repo.set(adjustedWidgetLayout);
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
  id: string,
  widget: object,
  repo: LayoutRepository,
) {
  const newParsed = parseUserWidgetLayout(JSON.stringify([widget]));

  if (!newParsed || !Array.isArray(newParsed) || newParsed.length < 1) {
    throw new AppError(`Cannot parse widget config: ${newParsed?.toString()}`);
  }

  const awc = await repo.get();
  const currentConfig = awc.find((e) => e.id === id) as UserWidgetLayout;

  if (!currentConfig) {
    throw new AppError(`No widget with ID ${id}`);
  }

  currentConfig.layout = newParsed[0]!.layout;

  try {
    const adjustedWidgetLayout = transformWidgetLayout(
      awc as UserWidgetLayout[],
    );
    await getLayoutRepository().set(adjustedWidgetLayout);
  } catch (error) {
    throw new AppError("Cannot save user widget config", error, true);
  }
}
