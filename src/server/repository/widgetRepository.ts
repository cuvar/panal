import { env } from "~/env.mjs";
import { WidgetUpstashRepository } from "./widgetUpstashRepository";
import parseWidgetConfig from "../service/parseWidgetConfigService";

export interface WidgetRepository {
  getWidgets(): Promise<WidgetConfig[]>;
  saveWidgets(widgets: WidgetConfig[]): Promise<void>;
}

export async function saveWidgets(data: object) {
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

  const config = await repo.saveWidgets(parsed);
  return config;
}

export async function getWidgets(): Promise<WidgetConfig[]> {
  let repo: WidgetRepository | null = null;
  if (env.WIDGET_STORE == "upstash") {
    repo = new WidgetUpstashRepository();
  }
  if (!repo) {
    throw new Error("Invalid widget store");
  }

  const config = await repo.getWidgets();
  return config;
}
