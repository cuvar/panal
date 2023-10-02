import { env } from "~/env.mjs";
import type {
  AdjustedWidgetConfig,
  UserWidgetConfig,
} from "~/utils/types/widget";
import addMissingLayouts from "../service/addMissingLayoutsService";
import adjustLayoutValues from "../service/adjustLayoutValuesService";
import parseWidgetConfig from "../service/parseWidgetConfigService";
import { WidgetUpstashRepository } from "./widgetUpstashRepository";

export interface WidgetRepository {
  get(): Promise<AdjustedWidgetConfig[]>;
  set(widgets: AdjustedWidgetConfig[]): Promise<void>;
}

export async function getWidgetsConfig(): Promise<UserWidgetConfig[]> {
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

  const fixedWidgetConfig = parsed.map((widget) => {
    const withMissing = addMissingLayouts(widget.layout);
    widget.layout = withMissing;
    const adjusted = adjustLayoutValues<AdjustedWidgetConfig>(
      widget as AdjustedWidgetConfig,
    );
    return adjusted;
  });

  const config = await repo.set(fixedWidgetConfig);
  return config;
}
