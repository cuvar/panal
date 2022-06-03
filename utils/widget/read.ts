import widgetConfig from "../../widgets.config";
import { IWidgetConfig, IWidgetData } from "../types/WidgetData";
import { colSmall, colMedium, colLarge, colXLarge } from "../../panal.config";

// % 1. read config -> to obj
export default function getWidgetData(): IWidgetConfig[] {
  const validatedWidgets: IWidgetConfig[] = validateConfig(widgetConfig);
  return validatedWidgets;
}

// % 2. validate config and rearrange if necessary
function validateConfig(configData: IWidgetConfig[]): IWidgetConfig[] {
  const validatedConfig: IWidgetConfig[] = [];

  for (let i: number = 0; i < configData.length; i++) {
    let hasError = false;
    const currentWidget: IWidgetConfig = configData[i];

    if (outOfColBounds(currentWidget)) {
      hasError = true;
      throw new Error("Widget is out of bounds");
      // todo: implement
      // todo: rearrage
    }

    for (let j: number = i + 1; j < configData.length; j++) {
      const nextWidget: IWidgetConfig = configData[i + 1];
      if (intersecting(currentWidget, nextWidget)) {
        throw new Error("Widget intersects with other widgets");
        hasError = true;
        // todo: implement
        // todo: rearrange
      }
    }

    if (hasError) {
      // todo: implement
    } else {
      validatedConfig.push(currentWidget);
    }
  }

  return validatedConfig;
}

// % 2a. check outOfBounds
function outOfColBounds(widget: IWidgetConfig): boolean {
  // todo: implement
  return false;
}
// % 2b. check intersecting
function intersecting(w1: IWidgetConfig, w2: IWidgetConfig): boolean {
  // todo: implement
  return false;
}
