import { env } from "~/env.mjs";
import { WidgetUpstashRepository } from "./widgetUpstashRepository";
import parseWidgetConfig from "../service/parseWidgetConfigService";
import type { WidgetConfig } from "~/utils/types/widget";
import adjustLayoutValues from "../service/adjustLayoutValuesService";

export interface WidgetRepository {
  get(): Promise<WidgetConfig[]>;
  set(widgets: WidgetConfig[]): Promise<void>;
}

export async function getWidgetsConfig(): Promise<WidgetConfig[]> {
  let repo: WidgetRepository | null = null;
  if (env.WIDGET_STORE == "upstash") {
    repo = new WidgetUpstashRepository();
  }
  if (!repo) {
    throw new Error("Invalid widget store");
  }

  const config = await repo.get();
  return config;
}

export async function saveWidgetsConfig(data: object) {
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
  const adjusted = adjustLayoutValues<WidgetConfig[]>(parsed);

  const config = await repo.set(adjusted);
  return config;
}
