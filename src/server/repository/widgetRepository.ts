import { env } from "~/env.mjs";
import { generateUniqueID } from "~/utils/helper";
import type { AdjustedWidgetConfig } from "~/utils/types/widget";
import addMissingLayouts from "../service/addMissingLayoutsService";
import adjustLayoutValues from "../service/adjustLayoutValuesService";
import parseWidgetConfig from "../service/parseWidgetConfigService";
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

  const fixedWidgetConfig = parsed.map((widget) => {
    const withMissing = addMissingLayouts(widget.layout);
    widget.layout = withMissing;
    (widget as AdjustedWidgetConfig).id = generateUniqueID();
    const adjusted = adjustLayoutValues<AdjustedWidgetConfig>(
      widget as AdjustedWidgetConfig,
    );
    return adjusted;
  });

  try {
    await repo.set(fixedWidgetConfig);
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
