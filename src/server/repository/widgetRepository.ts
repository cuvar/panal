import { env } from "~/env.mjs";
import type { AdjustedWidgetConfig } from "../entities/adjustedWidgetConfig";
import parseWidgetConfig from "../service/parseWidgetConfigService";
import transformWidgetConfig from "../service/transformWidgetConfigService";
import { WidgetUpstashRepository } from "./widgetUpstashRepository";

export interface WidgetRepository {
  get(): Promise<AdjustedWidgetConfig[]>;
  set(widgets: AdjustedWidgetConfig[]): Promise<void>;
}

export async function getAdjustedWidgetConfig() {
  let repo: WidgetRepository | null = null;
  if (env.WIDGET_STORE == "upstash") {
    repo = new WidgetUpstashRepository();
  }
  if (!repo) {
    throw new Error("Invalid widget store");
  }

  try {
    const config = await repo.get();
    return config;
  } catch (error) {
    throw error;
  }
}

export async function saveUserWidgetConfig(data: object) {
  let repo: WidgetRepository | null = null;
  if (env.WIDGET_STORE == "upstash") {
    repo = new WidgetUpstashRepository();
  }
  if (!repo) {
    throw new Error("Invalid widget store");
  }
  const parsed = parseWidgetConfig(JSON.stringify(data));
  if (parsed === null) {
    throw new Error("Invalid widget config");
  }
  const adjustedWidgetConfig = transformWidgetConfig(parsed);
  try {
    await repo.set(adjustedWidgetConfig);
  } catch (error) {
    throw error;
  }
}

export async function saveAdjustedWidgetConfig(data: AdjustedWidgetConfig[]) {
  let repo: WidgetRepository | null = null;
  if (env.WIDGET_STORE == "upstash") {
    repo = new WidgetUpstashRepository();
  }

  if (!repo) {
    throw new Error("Invalid widget store");
  }

  try {
    await repo.set(data);
  } catch (error) {
    throw error;
  }
}
